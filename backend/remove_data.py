import database as db

def remove_user_service(service_id):

    query = ("DELETE FROM users_providables WHERE id=%d;" % service_id)

    db.commitQuery(query)

