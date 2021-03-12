from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import market_database as db
import jwt, datetime
from dotenv import load_dotenv
import simplejson as json
load_dotenv()
import os

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

    user = data['user']

    # get user data with email (if they have made it this far then they already should have access)
    # data = db.dashboardData(user)
        
    return json.dumps({"dashboard" : db.dashboardData(user), "status" : 200})



if __name__ == "__main__" :
    app.run(host='0.0.0.0',debug=True,port='5000')
