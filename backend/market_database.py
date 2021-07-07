import mysql.connector
import base64
from datetime import datetime
from flask import jsonify, send_file

# IMPORT .ENV CONFIGS
import os

print(datetime.today().strftime('%Y-%m-%d'))

# return the connection of the database
def connection():
    # host is db for docker container & localhost for non docker container
    conn = mysql.connector.connect(host="localhost", user="root", password="Distant_7", database="market")
    return conn

# check if user has access to backend
def login(email, password):

    user = {}

    query = "SELECT id, first_name, last_name, email, password, avatar FROM users WHERE email="+ "'" + email +"';"
    result = executeQuery(query)

    # check password
    if result!=[] and result[4] == password:
        avatar = ""
        with open("./images/"+result[5], "rb") as avatar_image:
            avatar = base64.b64encode(avatar_image.read())

        id = result[0]
        first_name = result[1]
        last_name = result[2]
        email = result[3]
        
        user = {
            "id" : id,
            "firstName" : first_name,
            "lastName" : last_name,
            "email": email
        }

    return user

# sign user up
def signup(first_name, last_name, birthday, email, password):

    signup = False

    # check if the user isn't already signed up, else add him to the list

    db = connection()
    csr = db.cursor()

    query = "select * from users where email="+ "'" + email +"'"
    csr.execute(query)
    result = csr.fetchall()
    
    if(result==[]):
        query = "insert into users (first_name, last_name, birthday, email, password, date) values (\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");" % (first_name,last_name,birthday,email,password, datetime.today().strftime('%Y-%m-%d'))
        csr.execute(query)
        db.commit()
        signup = True


    csr.close()
    db.close()
    

    return signup

# return list of all the data in a given field  (always close a connection when passed)
def dashboardData(user):

    # get db components
    db = connection()
    csr = db.cursor()

    # get the user id, first name, last name
    query = "SELECT users.id, users.first_name, users.last_name, users.avatar FROM users WHERE users.email="+"'"+user+"';"
    csr.execute(query)
    result = csr.fetchall()[0]

    user_id = result[0]
    first_name = result[1]
    last_name = result[2]

    # convert the user avatar to base64 string
    with open("./images/"+result[3], "rb") as avatar_image:
        avatar = base64.b64encode(avatar_image.read())

    feedback = {}
    request = {}

    # get all user requests
    query = "SELECT users.first_name, users.last_name, services.service, users.rating FROM requests INNER JOIN services ON requests.service_id = services.id INNER JOIN users ON requests.reciever_id = users.id WHERE requests.user_servicer_id ="+str(user_id)+ ";"
    csr.execute(query)
    requests = csr.fetchall()

    # get all user feedback
    query = "SELECT users.first_name,users.last_name, services.service, feedback.rating FROM requests INNER JOIN users ON requests.reciever_id = users.id INNER JOIN payments ON requests.id = payments.request_id INNER JOIN feedback ON payments.id = feedback.payment_id INNER JOIN services ON requests.service_id = services.id WHERE requests.user_servicer_id="+str(user_id)+ ";"
    csr.execute(query)
    feedback = csr.fetchall()

    csr.close()
    db.close()

    return  {"first_name" :  first_name, "last_name" : last_name, "request" :  requests, "feedback" : feedback, "avatar" : avatar}

def profileData(user):

    # get db components
    db = connection()
    csr = db.cursor()

    query = "select users.first_name, users.last_name, users.avatar from users where users.email='" +str(user)+ "';"
    csr.execute(query)
    profile_data = csr.fetchall()[0]

    with open("./images/"+profile_data[2], "rb") as avatar_image:
        avatar = base64.b64encode(avatar_image.read())

    profile = {
        "first_name": profile_data[0],
        "last_name": profile_data[1],
        "avatar" : avatar
    }

    csr.close()
    db.close()

    return profile


def getUserID(user):
    db = connection()
    csr = db.cursor()

    query = "select id from users where email='" +str(user)+ "';"
    csr.execute(query)
    profile_data = csr.fetchall()[0]

    user_id = profile_data[0]

    csr.close()
    db.close()

    return user_id

def saveUserAvatar(user_id, filename):
    db = connection()
    csr = db.cursor()

    query = "UPDATE users SET avatar='" + filename + "' where id='" + str(user_id) +"';"
    csr.execute(query)
    db.commit()

    csr.close()
    db.close()

def updateName(first_name, last_name, user_id):
    db = connection()
    csr = db.cursor()

    query = "UPDATE users SET first_name='" + first_name + "', last_name='"+ last_name + "' where id='" + str(user_id) +"';"
    csr.execute(query)
    db.commit()


    csr.close()
    db.close()

def getUserServices(user_id):
    user_services = []
    
    query = "SELECT users_providables.id, users_providables.fee, users_providables.duration, users_providables.rating, services.id, services.service FROM users_providables INNER JOIN services ON users_providables.service_id = services.id WHERE user_id='" + str(user_id)+"';"
    result = executeQuery(query)

    for us in result:
        user_services.append({"id": us[0], "fee" : us[1], "duration" : us[2], "rating": us[3], "service_id": us[4], "service": us[5]})


    return user_services

def getServices():
    services = []

    query = "SELECT id, service FROM services ORDER BY service DESC;"

    result = executeQuery(query)

    for s in result:
        services.append({"id" : s[0], "service": s[1]})
    
    return services

def executeQuery(query):
    db = connection()
    csr = db.cursor()

    csr.execute(query)
    result = csr.fetchall()[0]

    csr.close()
    db.close()

    return result




# adds data to a given field    (always close a connection when passed)
