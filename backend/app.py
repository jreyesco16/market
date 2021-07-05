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
    data = request.get_json(force=True)

    email = data['email']
    password = data['password']

    user = db.login(email,password)
        
    # create a jwt token
    token = jwt.encode({
        'user' : {"user": "jesse"},
        'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=60*15),
        'authorization' : os.getenv('USER_TOKEN_SECRET'),
        }, os.getenv('ACCESS_TOKEN_SECRET'), algorithm="HS256")

    return jsonify({'market-token' : token, "status" : 500})

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
    
    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    user = data['user']

    return jsonify({"profile" : db.profileData(user), "status" : 200})

@app.route('/settings/<option>', methods = ['POST', 'GET'])
def settings(option):

    req = request.get_json(force=True)

    token = req['token']

    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    if( data['authorization'] != os.getenv('USER_TOKEN_SECRET')):
        return jsonify({'Success' : 'Failure', 'status' : 401})

    user = data['user']
    user_id = db.getUserID(user)

    if option == "account":
        first_name = req['first_name']
        last_name = req['last_name']

        new_avatar = str(req['avatar']).split(",")[1]

        db.updateName(first_name, last_name, user_id)

        # convert the new_avatar which represents a file as a base64 to a png file and save to images directory
        avatar_img = base64.b64decode(new_avatar)
        filename = 'user_' + str(user_id) + '.png'
        
        with open("./images/" + filename, "wb") as fo:
            fo.write(avatar_img)
            # save the file name under the users_id
            db.saveUserAvatar(user_id, filename)

    elif option == "userservices":
        # fetch all of users services from the backend
        return jsonify({'UserServices' :  db.getUserServices(user_id),'Success' : 'Success', 'status' : 200})
    
    elif option == "services":
        return jsonify({'Services' : db.getServices(), 'Success': 'Success', 'status': 200})

    return jsonify({'Success' : 'Forbidden', 'status' : 404})
    


if __name__ == "__main__" :
    app.run(host='0.0.0.0',debug=True,port='8000')
