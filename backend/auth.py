import database as db
import os, jwt, datetime

class User:
    def __init__(self, user):
        self.id = user[0]
        self.firstName = user[1]
        self.lastName = user[2]
        self.email = user[3]
        self.avatar = user[5]



def encodeToken(user):
    return jwt.encode({ 'user' : user, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=60*60), 'authorization' : os.getenv('USER_TOKEN_SECRET'), }, os.getenv('ACCESS_TOKEN_SECRET'), algorithm="HS256")



def decodeToken(token):
    return jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), algorithms=["HS256"])



def login(email, password):
    user = {}

    query = ("SELECT id, first_name, last_name, email, password, avatar FROM users WHERE email='%s';" % (email))
    result = db.executeQuery(query)[0]

    if result!=[] and result[4] == password:
        user = vars(User(result))

    return user



def signup(first_name, last_name, birthday, email, password):

    signup = False

    query = ("select * from users where email=%s;" % (email))
    result = db.executeQuery(query)

    if(result==[]):
        query = "insert into users (first_name, last_name, birthday, email, password, date) values (\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");" % (first_name,last_name,birthday,email,password, datetime.today().strftime('%Y-%m-%d'))
        csr.execute(query)
        db.commit()
        signup = True

    return signup