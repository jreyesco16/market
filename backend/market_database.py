import mysql.connector
from flask import jsonify

# IMPORT .ENV CONFIGS
import os

# return the connection of the database
def connection():
    # host is db for docker container & localhost for non docker container
    conn = mysql.connector.connect(host="localhost", user="root", password="Distant_7", database="market")
    return conn

# check if user has access to backend
def login(email, password):

    login = False

    db = connection()
    csr = db.cursor()

    sql_command = "select * from user where email="+ "'" + email +"'"
    csr.execute(sql_command)
    result = csr.fetchall()

    # check password
    if result!=[] and result[0][5]==password:
        login = True

    csr.close()
    db.close()

    return login

# sign user up
def signup(first_name, last_name, birthday, email, password):

    signup = False

    # check if the user isn't already signed up, else add him to the list

    db = connection()
    csr = db.cursor()

    query = "select * from user where email="+ "'" + email +"'"
    csr.execute(query)
    result = csr.fetchall()
    
    if(result==[]):
        query = "insert into user (first_name, last_name, birthday, email, password) values (\"%s\", \"%s\", \"%s\", \"%s\", \"%s\");" % (first_name,last_name,birthday,email,password)
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
    query = "select user_id,first_name,last_name from user WHERE email="+"'"+user+"';"
    csr.execute(query)
    result = csr.fetchall()[0]

    user_id = result[0]
    first_name = result[1]
    last_name = result[2]

    feedback = {}
    request = {}

    # get all user requests
    query = "select user.first_name, user.last_name, services.providable_service, user.user_rating from request inner join payment on payment.request_id != request.request_id inner join feedback on payment.payment_id = feedback.payment_id inner join user_services on request.user_service_id = user_services.user_service_id inner join services on user_services.services_id = services.services_id inner join user on request.reciever_id = user.user_id where request.servicer_id ="+str(user_id)+ ";"
    csr.execute(query)
    requests = csr.fetchall()

    # get all user feedback
    query = "select user.first_name,user.last_name, services.providable_service, feedback.overall_rating from request inner join user on request.reciever_id = user.user_id inner join user_services on request.user_service_id = user_services.user_service_id inner join services on user_services.services_id = services.services_id inner join payment on request.request_id = payment.request_id inner join feedback on payment.payment_id = feedback.payment_id where request.servicer_id="+str(user_id)+ ";"
    csr.execute(query)
    feedback = csr.fetchall()

    dashboard = {
        "first_name" :  first_name,
        "last_name" : last_name,
        "request" :  requests,
        "feedback" : feedback
    }

    return  dashboard


# adds data to a given field    (always close a connection when passed)
