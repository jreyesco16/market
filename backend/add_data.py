import database as db

def add_service(user_id, service):
    query = ("INSERT INTO users_providables (user_id, service_id, fee, duration, rating) VALUES (%d, %d, %f, %d, %f);" % (user_id, service['serviceId'], service['fee'], service['duration'], service['rating']))
    db.executeQuery(query)

    query = "SELECT users_providables.id ,fee, duration, rating, service_id, services.service FROM users_providables INNER JOIN services ON users_providables.service_id = services.id WHERE users_providables.id=LAST_INSERT_ID();"
    new_service = db.executeQuery(query)

    return new_service

