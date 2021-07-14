import database as db

class Request:
    def __init__(self, request):
        self.id = request[0]
        self.firstName = request[1]
        self.lastName = request[2]
        self.service = request[3]
        self.rating = request[4]
        self.date = request[5].strftime('%m/%d/%Y')

class Feeback:
    def __init__(self, feedback):
        self.id = feedback[0]
        self.firstName = feedback[1]
        self.lastName = feedback[2]
        self.service = feedback[3]
        self.rating = feedback[4]
        self.date = feedback[5].strftime('%m/%d/%Y')

class Service:
    def __init__(self, service):
        self.id = service[0]
        self.service = service[1]

class UserService:
    def __init__(self, user_service):
        self.id = user_service[0]
        self.fee = user_service[1]
        self.duration = user_service[2]
        self.rating = user_service[3]
        self.serviceID = user_service[4]
        self.service = user_service[5]

def dashboardData(user):
    user_id = user['id']

    requests = []
    query = ("SELECT requests.id, users.first_name, users.last_name, services.service, users.rating, requests.date FROM requests INNER JOIN services ON requests.service_id = services.id INNER JOIN users ON requests.reciever_id = users.id INNER JOIN payments p on requests.id != p.request_id WHERE requests.user_servicer_id=%s ORDER BY requests.date DESC;" % (user_id))
    result = db.executeQuery(query)
    for i in range(0, len(result)):
        request = Request(result[i])
        requests.append(vars(request))

    feedback = []
    query = ("SELECT feedback.id, users.first_name,users.last_name, services.service, feedback.rating, payments.date FROM requests INNER JOIN users ON requests.reciever_id = users.id INNER JOIN payments ON requests.id = payments.request_id INNER JOIN feedback ON payments.id = feedback.payment_id INNER JOIN services ON requests.service_id = services.id WHERE requests.user_servicer_id=%s ORDER BY payments.date DESC;" % (user_id))
    result = db.executeQuery(query)
    for i in range(0, len(result)):
        feedback_item = Feeback(result[i])
        feedback.append(vars(feedback_item))

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
    
    query = ("SELECT users_providables.id, users_providables.fee, users_providables.duration, users_providables.rating, services.id, services.service FROM users_providables INNER JOIN services ON users_providables.service_id = services.id WHERE user_id='%s';" % (user_id))
    result = db.executeQuery(query)
    for us in result:
        user_service = UserService(us)
        user_services.append(vars(user_service))

    return user_services

def getServices():
    services = []

    query = "SELECT id, service FROM services ORDER BY service ASC;"

    result = db.executeQuery(query)
    for s in result:
        service = Service(s)
        services.append(vars(service))
    
    return services