from flask import Flask, jsonify, request, send_file, url_for
from flask_restful import Api, Resource
from pymongo import MongoClient
from gridfs import GridFS
import bcrypt
# import style_transfer
# import supersize_gan
from PIL import Image
from werkzeug.utils import secure_filename
import time

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
api = Api(app)

client = MongoClient("mongodb://db:27017")
db = client.accendo
fs = GridFS(db)
users = db.users
images = db.images

def user_exists(username):
    if users.find({"username": username}).count() == 0:
        return False
    else:
        return True


def email_exists(email):
    if users.find({"email": email}).count() == 0:
        return False
    else:
        return True


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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

class Stylize(Resource):
    def post(self):
        start = time.time()
        username = request.form['username']
        if 'content_img' in request.files:
            content_img = request.files['content_img']
            if content_img.filename == '':
                # TODO
                return 0
            if content_img and allowed_file(content_img.filename):
                content_img_id = fs.put(content_img)
                # client.save_file(filename, content_img)
                images.insert_one(
                    {'username': username, 'img': content_img_id})

        if 'style_img' in request.files:
            style_img = request.files['style_img']
            if style_img.filename == '':
                # TODO
                return 0
            if style_img and allowed_file(style_img.filename):
                style_img_id = fs.put(style_img)
                # client.save_file(filename, content_img)
                images.insert_one({'username': username, 'img': style_img_id})
        else:
            return jsonify({
                "status": 301,
                "msg": "Invalid input"
            })
        style_time = time.time()
        stylized_img = style_transfer.process(content_img_id, style_img_id)
        print('Styling time:', time.time() - style_time)
        print('Total time:', time.time() - start)
        return send_file(fs.get(stylized_img), attachment_filename=(str(stylized_img) + '.jpg'))


class Supersize(Resource):
    def post(self):
        start = time.time()
        username = request.form['username']
        if 'img' in request.files:
            img = request.files['img']
            if img.filename == '':
                # TODO
                return 0
            if img and allowed_file(img.filename):
                img_id = fs.put(img)
                # client.save_file(filename, content_img)
                images.insert_one({'username': username, 'img': img_id})
        else:
            return jsonify({
                "status": 301,
                "msg": "Invalid input"
            })

        supersize = time.time()
        supersized_img = supersize_gan.process(img_id)
        print('Styling time:', time.time() - supersize)
        print('Total time:', time.time() - start)
        return send_file(fs.get(supersized_img), attachment_filename=(str(supersized_img) + '.jpg'))


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Stylize, "/stylize")
api.add_resource(Supersize, "/supersize")


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
      <br>
      <input type=submit value=Submit>
    </form>
    <h1>Login</h1>
    <form method=POST action='/login' enctype=multipart/form-data>
      Username: <input type=text name=username id=username>
      Password: <input type=password name=password id=password>
      <br>
      <input type=submit value=Submit>
    </form>
    <h1>Stylize</h1>
    <form action='/stylize' method=POST enctype=multipart/form-data>
      <input type=text name=username>
      <input type=file name=content_img>
      <input type=file name=style_img>
      <input type=submit value=Upload>
    </form>
    <h1>Supersize</h1>
     <form action='/supersize' method=POST enctype=multipart/form-data>
      <input type=text name=username>
      <input type=file name=img>
      <input type=submit value=Upload>
    </form>
    '''


if __name__ == "__main__":
    app.run(host="0.0.0.0")
