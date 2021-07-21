import database as db
from get_data import UserService

def add_service(user_id, service):
    query = ("INSERT INTO users_providables (user_id, service_id, fee, duration, rating) VALUES (%d, %d, %f, %d, %f);" % (user_id, service['serviceId'], service['fee'], service['duration'], service['rating']))
    db.commitQuery(query)

    query = ("SELECT users_providables.id ,fee, duration, rating, service_id, services.service FROM users_providables INNER JOIN services ON users_providables.service_id = services.id WHERE users_providables.user_id=%d AND users_providables.service_id=%d AND users_providables.fee=%f AND users_providables.duration=%d AND users_providables.rating=%f;" % (user_id, service['serviceId'], service['fee'], service['duration'], service['rating']))
    new_service = db.executeQuery(query)[0]

    user_service = UserService(new_service)

    return vars(user_service)
