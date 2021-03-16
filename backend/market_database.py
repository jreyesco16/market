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

