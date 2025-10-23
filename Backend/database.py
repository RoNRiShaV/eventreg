import mysql.connector
from mysql.connector import pooling

dbconfig = {
    "host": "localhost",
    "user": "csbs_19",
    "password": "cristiano07",
    "database": "event_registration"
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

def get_connection():
    return connection_pool.get_connection()
