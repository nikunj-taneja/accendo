from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
api = Api(app)

client = MongoClient("mongodb://db:27017")
db = client.Accendo
users = db["Users"]

def user_exists(username):
    if users.find({"Username": username}).count() == 0:
        return False
    else:
        return True

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        
        if user_exists(username):
            return jsonify({
                "status": 301,
                "msg": "Invalid username"
            })
        
        hashed_pw = bcrypt.hashpw(password.encode("utf8"), bcrypt.gensalt())
        users.insert({
            "Username": username,
            "Password": hashed_pw
        })

        return jsonify({
            "status": 200,
            "msg": "User registered"
        })

api.add_resource(Register, "/register")

if __name__ == "__main__":
    app.run(host="0.0.0.0")