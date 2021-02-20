from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import alphax_database as db
import jwt, datetime
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('USER_TOKEN_SECRET')
# allows availability to/from all sources
CORS(app)

# user global data
user = ""

# @app.route('/')
# def alphax_backend():
#     return render_template("backend_login.html")

@app.route('/login', methods = ['POST', 'GET'])
def login():
    # return true if the user is found else return false
    login = "Failure"

    data = request.get_json(force=True)

    email = data['email']
    password = data['password']

    if db.login(email,password):
        global user
        user = email
        login = "Success"
        
        # create a jwt token
        token = jwt.encode({
            
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
        
    return jsonify({"User" : user, "status" : 200})



if __name__ == "__main__" :
    app.run(debug=True)
