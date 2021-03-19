import mysql.connector
import base64
from flask import jsonify, send_file

# IMPORT .ENV CONFIGS
import os

# return the connection of the database
def connection():
    # host is db for docker container & localhost for non docker container
    conn = mysql.connector.connect(host="db", user="root", password="Distant_7", database="market")
    return conn

# call this function to when ever someone visits your website (records the number of visiters)
def updateVisiter():

    db = connection()
    csr = db.cursor()
    
    # get the current count of users
    query = "select visiter_count from visiter where visiter_id = 1;"
    csr.execute(query)
    curr_count = csr.fetchall()[0][0]

    new_count = curr_count + 1

    query = "update visiter set visiter_count=" + str(new_count) + " where visiter_id=1;"
    csr.execute(query)
    db.commit()

    csr.close()
    db.close()

