from flask import Flask, jsonify, request, send_file, url_for
from flask_restful import Api, Resource
from pymongo import MongoClient
from gridfs import GridFS
import bcrypt
import style_transfer
import supersize_gan
from PIL import Image
from werkzeug.utils import secure_filename
import time
from bson.objectid import ObjectId

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
api = Api(app)

client = MongoClient("mongodb://db:27017")
db = client.accendo
fs = GridFS(db)
users = db.users
images = db.images

def user_exists(username):
    return users.find({"username": username}).count() != 0

def email_exists(email):
    return users.find({"email": email}).count() != 0

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def already_liked(file_id, username):
    return images.find({
        'file_id': file_id,
        'likes': username
    }).count() == 1

class Register(Resource):
    def post(self):
        data = request.form
        username = data['username']
        password = data['password']
        email = data['email']

        if user_exists(username):
            return jsonify({
                'status': 301,
                'msg': 'Invalid username'
            })

        if email_exists(email):
            return jsonify({
                'status': 301,
                'msg': 'Invalid email'
            })

        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        users.insert_one({
            'username': username,
            'password': hashed_pw,
            'email': email
        })

        return jsonify({
            'status': 200,
            'msg': 'User registered'
        })


class Login(Resource):
    def post(self):
        data = request.form
        username = data['username']
        password = data['password']

        user = users.find_one({
            'username': username,
        })
        
        if user:
            hashed_pw = user['password']
            if bcrypt.checkpw(password.encode('utf8'), hashed_pw):
                return jsonify({
                    'status': 200,
                    'msg': 'Login successful'
                })
            else:
                return jsonify({
                    'status': 301,
                    'msg': 'Invalid password'
                })
        else:
            return jsonify({
                'status': 301,
                'msg': 'Invalid username'
            })


class Upload(Resource):
    def post(self):
        if 'image' in request.files:
            username = request.form['username']
            image_file = request.files['image']
            if image_file.filename == '':
                return jsonify({
                    'status': 301,
                    'msg': 'Empty file'
                })
            if image_file and allowed_file(image_file.filename):
                file_id = fs.put(image_file)
                images.insert_one({'username' : username, 'file_id' : file_id})
                return jsonify({
                    'status': 200,
                    'msg': 'File uploaded successfully',
                    'file_id': str(file_id)
                })
            else:
                return jsonify({
                    'status': 301,
                    'msg': 'Invalid file'
                })
        else:
            return jsonify({
                'status': 301,
                'msg': 'No file in request'
            })


class GetFile(Resource):
    def get(self, file_id):
        if fs.exists(ObjectId(file_id)):
            return send_file(fs.get(ObjectId(file_id)), attachment_filename = str(file_id) + '.jpg')
        else:
            return jsonify({
                'status': 404,
                'msg': 'File not found'
            })


class GetInfo(Resource):
    def get(self, file_id):
        if fs.exists(ObjectId(file_id)):
            root = 'http://localhost:5000/file/'
            img = images.find({'file_id': ObjectId(file_id)})[0]
            res = {
                'status': 200,
                'msg': 'Image info compiled successfully',
                'username': img['username'],
                'image_url': root + str(img['file_id']),
                'file_id': str(img['file_id']),
                'likes': img['likes'],
                'like_count': img['like_count'],
            }
            return jsonify(res)
        else:
            return  jsonify({
                'status': 404,
                'msg': 'File not found'
            })


class Stylize(Resource):
    def post(self):
        username = request.form['username']
        content_img_id = ObjectId(request.form['file_id'])
        if 'style_img' in request.files:
            style_img = request.files['style_img']
            if style_img.filename == '':
                return jsonify({
                    'status': 301,
                    'msg': 'Invalid style image'
                })
            if style_img and allowed_file(style_img.filename):
                style_img_id = fs.put(style_img)
                images.insert_one({
                    'username': username,
                    'img': style_img_id
                })
        else:
            return jsonify({
                "status": 301,
                "msg": "Invalid style image"
            })
        stylized_img_id = style_transfer.process(content_img_id, style_img_id)
        
        images.insert_one({
            'username': username,
            'file_id': supersized_img_id
        })
        
        return jsonify({
            'status': 200,
            'msg': 'Image stylized successfully.',
            'file_id': str(stylized_img_id)
        })


class Supersize(Resource):
    def post(self):
        username = request.form['username']
        img_id = ObjectId(request.form['file_id'])
        supersized_img_id = supersize_gan.process(img_id)
        
        images.insert_one({
            'username': username,
            'file_id': supersized_img_id
        })
        
        return jsonify({
            'status': 200,
            'msg': 'Image supersized successfully.',
            'file_id': str(supersized_img_id)
        })


class Gallery(Resource):
    def get(self, username):
        res = {
            'status': 200,
            'msg': 'Gallery posts compiled successfully',
            'images': []
        }
        for img in images.find({'username': username}):
            root = 'http://localhost:5000/file/'
            temp = {
                'username': img['username'],
                'image_url': root + str(img['file_id']),
                'file_id': str(img['file_id']),
                'public': img['public'],
                'likes': img['likes'],
                'like_count': img['like_count'],
            }
            res['images'].append(temp)
        return jsonify(res)


class Post(Resource):
    def post(self):
        data = request.form
        username = data['username']
        file_id = ObjectId(data['file_id'])
        if username and file_id and fs.exists(file_id):
            images.update_one({
                'file_id': file_id,
            },{
                '$set': {
                    'public': True,
                    'likes': [],
                    'like_count': 0
                }
            })
            return jsonify({
                'status': 200,
                'msg': 'The image has been made public successfully',
                'file_id': str(file_id),
            })
        else:
            return jsonify({
                'status': 301,
                'msg': 'Invalid file_id'
            })


class Like(Resource):
    def post(self):
        data = request.form
        username = data['username']
        file_id = ObjectId(data['file_id'])
        if username and file_id and fs.exists(file_id):
            if not already_liked(file_id, username):
                images.update_one({
                    'file_id': file_id,
                },{
                    '$push': {
                        'likes': username,
                    },
                    '$inc': {
                        'like_count': 1
                    }
                }, upsert=True)
                likes = images.find({'file_id': file_id})[0]['likes']
                like_count = images.find({'file_id': file_id})[0]['like_count']
                return jsonify({
                    'status': 200,
                    'msg': 'The image liked successfully',
                    'file_id': str(file_id),
                    'likes': likes,
                    'like_count': like_count
                })
            else:
                images.update_one({
                    'file_id': file_id,
                },{
                    '$pull': {
                        'likes': username,
                    },
                    '$inc': {
                        'like_count': -1
                    }
                }, upsert=False)
                likes = images.find({'file_id': file_id})[0]['likes']
                like_count = images.find({'file_id': file_id})[0]['like_count']
                return jsonify({
                    'status': 200,
                    'msg': 'The image unliked successfully',
                    'file_id': str(file_id),
                    'likes': likes,
                    'like_count': like_count
                })
        else:
            return jsonify({
                'status': 301,
                'msg': 'Invalid file_id'
            })
    

class Community(Resource):
    def get(self):
        res = {
            'status': 200,
            'msg': 'Community posts compiled successfully',
            'images': []
        }
        for img in images.find({'public': True}):
            root = 'http://localhost:5000/file/'
            temp = {
                'username': img['username'],
                'image_url': root + str(img['file_id']),
                'file_id': str(img['file_id']),
                'likes': img['likes'],
                'like_count': img['like_count'],
            }
            res['images'].append(temp)
        return jsonify(res)


api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Upload, '/upload')
api.add_resource(Stylize, '/stylize')
api.add_resource(Supersize, '/supersize')
api.add_resource(GetFile, '/file/<string:file_id>')
api.add_resource(GetInfo, '/info/<string:file_id>')
api.add_resource(Post, '/post')
api.add_resource(Like, '/like')
api.add_resource(Community, '/community')
api.add_resource(Gallery, '/gallery/<string:username>')


@app.route('/')
def testing():
    return '''
    <!doctype html>
    <title>testing</title>
    <h1>Register</h1>
    <form method=POST action='/register' enctype=multipart/form-data>
        Username: <input type=text name=username id=username>
        Password: <input type=password name=password id=password>
        Email: <input type=email name=email id=email>
        <input type=submit value=Submit>
    </form>
    <h1>Login</h1>
    <form method=POST action='/login' enctype=multipart/form-data>
        Username: <input type=text name=username id=username>
        Password: <input type=password name=password id=password>
        <input type=submit value=Submit>
    </form>
    <h1>Upload</h1>
    <form action='/upload' method=POST enctype=multipart/form-data>
        Username: <input type=text name=username>
        <input type=file name=image>
        <input type=submit value=Upload>
    </form>
    <h1>Stylize</h1>
    <form action='/stylize' method=POST enctype=multipart/form-data>
        Username: <input type=text name=username>
        File_Id: <input type=text name=file_id>
        Style_Img: <input type=file name=style_img>
        <input type=submit value=Stylize>
    </form>
    <h1>Supersize</h1>
    <form action='/supersize' method=POST enctype=multipart/form-data>
        Username: <input type=text name=username>
        File_Id: <input type=text name=file_id>
        <input type=submit value=Supersize>
    </form>
    <h1>Post</h1>
    <form action='/post' method=POST enctype=multipart/form-data>
        Username: <input type=text name=username>
        File_Id: <input type=text name=file_id>
        <input type=submit value=Post>
    </form>
    <h1>Like</h1>
    <form action='/like' method=POST enctype=multipart/form-data>
        Username: <input type=text name=username>
        File_Id: <input type=text name=file_id>
        <input type=submit value=Like>
    </form>
    '''

if __name__ == "__main__":
    app.run(host="0.0.0.0")
