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

    # get first_name, last_name, jobs, feedback
    # data = {
    #     "first_name" :  ,
    #     "last_name" : ,
    #     "jobs" :  ,
    #     "feedback" :
    # }


    return jsonify({"data": data }}


# adds data to a given field    (always close a connection when passed)
