from flask import Blueprint
from flask_cors import cross_origin
import string,random

from config.pwd import auth
from config.pwdToken import auth as auth2
from config.mariadb2 import fetchList, postVariable
from flask import Response, request
import json

r_token = Blueprint('token', __name__, )


@r_token.route('/token/list', methods=['GET'])
@auth.login_required
def listToken():
    try:
        res = fetchList("select * from token")
        if res == []:
            return json.loads('{}')
        else:
            return res
    except:
        return Response("Internal Server Error", 500)


@r_token.route('/token/verify', methods=['GET'])
def verifyToken():
    value = request.args.get("id")
    if value==None:
        return Response("id can't be null ",400)
    elif value=="":
        return Response( "id can't be null ",400)
    try:
        sql = f"SELECT * from token WHERE valeur='{value}'"
    except:
        return Response("Json Post has not the correct format", 400)
    try:
        res = fetchList(sql)
        if type(res)==list:
            return Response("False", 403)
        xres=json.loads(res)
        if len(xres)==1:
            return Response("True",200)
        else:
            return Response("False",403)
    except Exception as e:
        print(e)
        return Response("ISS", 500)



@r_token.route('/token/validate', methods=['GET','POST'])
def validateToken():
    req = request.get_json()
    print(req)
    if type(req) != dict:
        if type(req) != list:
            return Response(str(type(req)) + " No Json Post", 400)
        else:
            return Response("Json List is not accepted", 400)
    try:
        sql = f"SELECT * from token WHERE valeur='{req['value']}'"
        s_prenom=req["prenom"].lower()
        s_nom=req["nom"].lower()
    except:
        return Response("Json Post has not the correct format", 400)
    try:
        res = fetchList(sql)
        if type(res)==list:
            return Response("False", 403)
        xres=json.loads(res)
        r_prenom=xres[0]["prenom"]
        r_nom=xres[0]["nom"]
        if (s_prenom==r_prenom) and (s_nom==r_nom):
            return Response("True",200)
        else:
            return Response("False",403)
    except Exception as e:
        print(e)
        return Response("ISS", 500)

def validateTokenMan(req):
    try:
        sql = f"SELECT * from token WHERE valeur='{req['token']}'"
        s_prenom = req["prenom"]
        s_nom = req["nom"]
    except:
        return False
    try:
        res = fetchList(sql)
        xres = json.loads(res)
        r_prenom = xres[0]["prenom"]
        r_nom = xres[0]["nom"]
        if (s_prenom == r_prenom) and (s_nom == r_nom):
            return True
        else:
            return False
    except Exception as e:
        return False


def getagent(token):
    sql = f"SELECT * from token WHERE valeur='{token}'"
    try:
        res = fetchList(sql)
        xres = json.loads(res)
        return xres[0]["agent"]
    except Exception as e:
        return False

def deleteToken(req):
    tokenValid = validateTokenMan(req)
    if tokenValid:
        sql = f"DELETE from token WHERE valeur='{req['token']}'"
        try:
            postVariable(sql)
            return True
        except:
            print("PB sql")
            return False
    else:
        print("Token Non Valid")
        return False


@r_token.route('/token/add', methods=['GET','POST'])
@auth2.login_required()
def addToken():
    print (request.__dict__)
    req = request.get_json()
    print(req)
    if type(req) != dict:
        if type(req) != list:
            return Response(str(type(req)) + " No Json Post", 400)
        else:
            return Response("Json List is not accepted", 400)
    r_value=''.join(random.choices(string.ascii_uppercase + string.digits, k = 28))
    try:
        sql = f"INSERT INTO token (valeur,prenom,nom,agent) VALUES ('{r_value}','{req['prenom'].lower()}','{req['nom'].lower()}','{req['agent'].lower()}')"
    except:
        return Response("Json Post has not the correct format", 400)
    try:
        postVariable(sql)
        return Response(f"http://monpetitbet.fr/register/?token={r_value}",200)
    except Exception as e:
        print(e)
        return Response("ISS", 500)