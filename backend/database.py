import mysql.connector
import base64
from datetime import datetime
from flask import jsonify, send_file

# IMPORT .ENV CONFIGS
import os

def connection():
    # host is db for docker container & localhost for non docker container
    conn = mysql.connector.connect(host="localhost", user="root", password="Distant_7", database="market")
    return conn

def executeQuery(query):
    db = connection()
    csr = db.cursor()

    csr.execute(query)
    result = csr.fetchall()

    csr.close()
    db.close()

    return result

def commitQuery(query):
    db = connection()
    csr = db.cursor()

    csr.execute(query)
    db.commit()

    csr.close()
    db.close()

