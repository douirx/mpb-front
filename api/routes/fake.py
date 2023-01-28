from flask import Blueprint
from jsons import NoneType

from config.pwd import auth
from config.pwdToken import auth as auth2
from config.mariadb2 import fetchList,postVariable
from flask import Response,request
import json

r_fake = Blueprint('fake', __name__)

@r_fake.route('/fake/list', methods=['GET'])
@auth.login_required
def listCp():
    try:
        res =  fetchList("select * from fake")
        if res == []:
           return json.loads('{}')
        else:
           return res
    except:
        return Response("Internal Server Error", 500)

@r_fake.route('/fake/get', methods=['GET'])
@auth2.login_required()
def getFake():
    pseudo=request.args.get("pseudo")
    if type(pseudo)==NoneType:
        return Response("No correct pseudo filed,400")
    try:
        res = fetchList(f"select * from fake where pseudo='{pseudo}'")
        print(res)
        return json.dumps(json.loads(res)[0])
    except:
        return Response("No fake with pseudo", 400)


def checkPseudo(pseudo):
    try:
        x=fetchList(f"select * from fake where pseudo='{pseudo}'")
        if x!=[]:
            return True
        else:
            return False
    except:
        return False

##A TERMINER CAR MODIF BDD


@r_fake.route('/fake/add', methods=['POST'])
@auth2.login_required()
def addCpList():
    resi = request.get_json()

    if checkPseudo(resi['pseudo'])==True:
        try:
            sql = "UPDATE fake SET "
            sql+=f"email='{resi['email']}',mobile='{resi['mobile']}',indicatif='{resi['indicatif']}',pwd='{resi['pwd']}'," \
                 f"iban='{resi['iban']}',bic='{resi['bic']}'," \
                 f"animal='{resi['animal']}',idpmu='{resi['idpmu']}' "
            sql+=f"WHERE pseudo = '{resi['pseudo']}'"
            print(sql)
        except KeyError:
            return Response("Json filed is not in the right format", 400)
    else:
        try :
            sql = "INSERT INTO fake (pseudo,email,mobile,indicatif,pwd,iban,bic,animal,idpmu) VALUES "
            sql += f"('{resi['pseudo']}','{resi['email']}','{resi['mobile']}','{resi['indicatif']}','{resi['pwd']}','{resi['iban']}','{resi['bic']}','{resi['animal']}','{resi['idpmu']}')"
            print(sql)
        except KeyError:
            return Response("Json filed is not in the right format", 400)
    try:
        postVariable(sql)
        return "Fake added"
    except Exception as e:
        print(e)
        return Response("Internal Server Error", 500)


