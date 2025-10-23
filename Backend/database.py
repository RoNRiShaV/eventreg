import mysql.connector
from mysql.connector import pooling
import os

dbconfig = {
    "host": os.getenv("DB_HOST", "db"),      # use the Docker service name
    "user": os.getenv("DB_USER", "csbs_19"),
    "password": os.getenv("DB_PASSWORD", "cristiano07"),
    "database": os.getenv("DB_NAME", "event_registration")
}

connection_pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

def get_connection():
    return connection_pool.get_connection()
