import mysql.connector
import base64
from datetime import datetime
from flask import jsonify, send_file

# IMPORT .ENV CONFIGS
import os

# print(datetime.today().strftime('%Y-%m-%d'))
class Request:
    def __init__(self, request):
        self.id = request[0]
        self.firstName = request[1]
        self.lastName = request[2]
        self.service = request[3]
        self.rating = request[4]
        self.date = request[5].strftime('%m/%d/%Y')


# return the connection of the database
def connection():
    # host is db for docker container & localhost for non docker container
    conn = mysql.connector.connect(host="localhost", user="root", password="Distant_7", database="market")
    return conn

# check if user has access to backend
def login(email, password):

    user = {}

    print("Email ", email)

    query = ("SELECT id, first_name, last_name, email, password, avatar FROM users WHERE email='%s';" % (email))
    result = executeQuery(query)[0]

    # check password
    if result!=[] and result[4] == password:
        id = result[0]
        first_name = result[1]
        last_name = result[2]
        email = result[3]
        avatar = result[5]
        
        user = {
            "id" : id,
            "firstName" : first_name,
            "lastName" : last_name,
            "email": email,
            "avatar": avatar
        }

    return user

# sign user up
def signup(first_name, last_name, birthday, email, password):

    signup = False

    query = ("select * from users where email=%s;" % (email))
    result = executeQuery(query)
    
    # needs to be updated should have only unique emails
    if(result==[]):
        query = "insert into users (first_name, last_name, birthday, email, password, date) values (\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");" % (first_name,last_name,birthday,email,password, datetime.today().strftime('%Y-%m-%d'))
        csr.execute(query)
        db.commit()
        signup = True

    return signup


def dashboardData(user):
    user_id = user['id']

    requests = []
    query = ("SELECT requests.id, users.first_name, users.last_name, services.service, users.rating, requests.date FROM requests INNER JOIN services ON requests.service_id = services.id INNER JOIN users ON requests.reciever_id = users.id WHERE requests.user_servicer_id =%s ORDER BY requests.date DESC;" % (user_id))
    result = executeQuery(query)
    for i in range(0, len(result)):
        request = Request(result[i])
        requests.append(vars(request))

    feedback = []
    query = ("SELECT users.first_name,users.last_name, services.service, feedback.rating FROM requests INNER JOIN users ON requests.reciever_id = users.id INNER JOIN payments ON requests.id = payments.request_id INNER JOIN feedback ON payments.id = feedback.payment_id INNER JOIN services ON requests.service_id = services.id WHERE requests.user_servicer_id=%s;" % (user_id))
    result = executeQuery(query)
    for i in range(0, len(result)):
        firstName = result[i][0]
        lastName = result[i][1]
        service = result[i][2]
        rating = result[i][3]
        feedback.append({"firstName": firstName, "lastName": lastName, "service": service, "rating": rating})

    return  {"requests" :  requests, "feedback" : feedback}

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
    result = csr.fetchall()

    csr.close()
    db.close()

    return result




# adds data to a given field    (always close a connection when passed)
