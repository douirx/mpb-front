from flask_httpauth import HTTPBasicAuth
from config.mariadb1 import readTxt
from werkzeug.security import generate_password_hash,check_password_hash
import os
from config.io import pconfig

auth = HTTPBasicAuth()

def setPwd(file):
    dico=readTxt(file)
    for x in dico.keys():
        dico[x]=generate_password_hash(dico[x])
    return dico

users = setPwd(os.path.join(pconfig,"auth.txt"))
users.update(setPwd(os.path.join(pconfig,"authToken.txt")))

@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username
