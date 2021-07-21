from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image
import jwt, datetime
from dotenv import load_dotenv
import simplejson as json
load_dotenv()
import os
import base64
import io
import auth
import get_data
import add_data

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('USER_TOKEN_SECRET')
# allows availability to/from all sources
CORS(app)

@app.route('/login', methods = ['POST', 'GET'])
def login():
    data = request.get_json(force=True)

    email = data['email']
    password = data['password']

    user = auth.login(email,password)
        
    token = auth.encodeToken(user)

    return jsonify({'market-token' : token, "status" : 500})


@app.route('/signup', methods = ['POST', 'GET'])
def signup():

    signup = "Failure"
    
    data = request.get_json(force=True)

    first_name = data['first_name']
    last_name = data['last_name']
    birthday = data['birthday']
    email = data['email']
    password = data['password']

    if auth.signup(first_name, last_name, birthday, email, password):
        signup = "Success"

    return jsonify({"Signup" : signup, "status" : 200})


@app.route('/dashboard', methods = ['POST', 'GET'])
def dashboard():

    user = request.get_json(force=True)['user']

    dashboard = get_data.dashboardData(user)
          
    return json.dumps({"dashboard" : dashboard, "status" : 200})


@app.route('/profile', methods = ['POST', 'GET'])
def profile():
    token = request.get_json(force=True)['token']
    
    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    user = data['user']

    return jsonify({"profile" : get_data.profileData(user), "status" : 200})

@app.route('/settings/<option>', methods = ['POST', 'GET'])
def settings(option):

    req = request.get_json(force=True)

    token = req['token']

    data = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])

    if( data['authorization'] != os.getenv('USER_TOKEN_SECRET')):
        return jsonify({'Success' : 'Failure', 'status' : 401})

    user = data['user']
    user_id = user['id']

    if option == "account":
        first_name = req['first_name']
        last_name = req['last_name']

        new_avatar = str(req['avatar']).split(",")[1]

        get_data.updateName(first_name, last_name, user_id)

        # convert the new_avatar which represents a file as a base64 to a png file and save to images directory
        avatar_img = base64.b64decode(new_avatar)
        filename = 'user_' + str(user_id) + '.png'
        
        with open("./images/" + filename, "wb") as fo:
            fo.write(avatar_img)
            # save the file name under the users_id
            get_data.saveUserAvatar(user_id, filename)

    elif option == "userservices":
        # fetch all of users services from the backend
        return jsonify({'UserServices' :  get_data.getUserServices(user_id),'Success' : 'Success', 'status' : 200})
    
    elif option == "services":
        return jsonify({'Services' : get_data.getServices(), 'Success': 'Success', 'status': 200})
    
    elif option == "new-service":

        service = req['service']
        new_user_service = add_data.add_service(user_id, service)
        print("new user service ", new_user_service)

        return jsonify({ 'Success': "Success", 'userService': new_user_service, 'status' : 200 })

    return jsonify({'Success' : 'Forbidden', 'status' : 404})
    


if __name__ == "__main__" :
    app.run(host='0.0.0.0',debug=True,port='8000')
