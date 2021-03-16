from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image
import market_database as db
import jwt, datetime
from dotenv import load_dotenv
import simplejson as json
load_dotenv()
import os
import base64
import io

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('USER_TOKEN_SECRET')
# allows availability to/from all sources
CORS(app)

@app.route('/login', methods = ['POST', 'GET'])
def login():
    # return true if the user is found else return false
    login = "Failure"

    data = request.get_json(force=True)

    email = data['email']
    password = data['password']

    if db.login(email,password):
        user = email
        login = "Success"
        
        # create a jwt token
        token = jwt.encode({
            'user' : user,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=60*15),
            'authorization' : os.getenv('USER_TOKEN_SECRET'),

        }, os.getenv('ACCESS_TOKEN_SECRET'), algorithm="HS256")

        return jsonify({'token' : token, "login" : login, "status" : 200})

    return jsonify({"login" : login, "status" : 200})

@app.route('/signup', methods = ['POST', 'GET'])
def signup():
    # return true if the user is successfully added or false if the user (email) is already in the db
    signup = "Failure"
    data = request.get_json(force=True)

    first_name = data['first_name']
    last_name = data['last_name']
    birthday = data['birthday']
    email = data['email']
    password = data['password']

    if db.signup(first_name, last_name, birthday, email, password):
        signup = "Success"

    return jsonify({"Signup" : signup, "status" : 200})

@app.route('/dashboard', methods = ['POST', 'GET'])
def dashboard():

    token = request.get_json(force=True)['token']

    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    dashboard = db.dashboardData(data['user'])
          
    return json.dumps({"dashboard" : dashboard, "status" : 200})

@app.route('/profile', methods = ['POST', 'GET'])
def profile():
    token = request.get_json(force=True)['token']

    data = data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    user = data['user']

    return jsonify({"profile" : db.profileData(user), "status" : 200})

@app.route('/settings/<option>', methods = ['POST', 'GET'])
def settings(option):

    rest = request.get_json(force=True)

    token = rest['token']

    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    user = data['user']

    if option == "avatar":
        new_avatar = str(rest['avatar']).split(",")[1]

        print(new_avatar)

        user_id = db.getUserID(user)

        # convert the new_avatar which represents a file as a base64 to a jpeg file and save to images directory
        avatar_img = base64.b64decode(new_avatar)
        im = Image.open(io.BytesIO(base64.b64decode(new_avatar)))
        im.show()
        filename = './images/user_' + str(user_id) + '.jpeg'

        # with open(filename, 'wb') as f:
        #     f.write(avatar_img)
        # im = Image.open(filename)
        # im.show()

    return jsonify({'Success' : 'Success', 'status' : 200})


if __name__ == "__main__" :
    app.run(host='0.0.0.0',debug=True,port='5000')
