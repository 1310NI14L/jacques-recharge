import os
import pymysql
import pymysql.cursors
from dotenv import load_dotenv

# 1. On charge les variables cachées dans le .env
load_dotenv()

# Récupération des données
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASSWORD = os.getenv("GMAIL_PASSWORD")

# 2. On crée le dictionnaire de connexion à partir des variables
def get_db_connection():
  return pymysql.connect(
      host=os.getenv('DB_HOST', 'localhost'),
      user=os.getenv('DB_USER', 'root'),
      password=os.getenv('DB_PASSWORD', ''),
      database=os.getenv('DB_NAME', 'recharge_db'),
      cursorclass=pymysql.cursors.DictCursor,
      charset='utf8mb4',
  )



