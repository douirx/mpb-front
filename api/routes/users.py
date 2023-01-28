from flask import Blueprint
from routes.token import validateTokenMan, deleteToken, getagent

from config.pwd import auth
from config.pwdToken import auth as auth2
from config.mariadb2 import fetchList,postVariable
from flask import Response,request
import json

r_users = Blueprint('users', __name__,)

@r_users .route('/users/checkpseudo', methods=['GET'])
@auth2.login_required()
def checkPseudo():
    pseudo = request.args.get("pseudo")
    try:
        res=fetchList(f"select * from u_perso where pseudo='{pseudo}'")
        if res!=[]:
            return Response("Pseudo exists",200)
        else:
            return Response("Pseudo does not exists",406)
    except:
        return Response("Pseudo does not exists",406)



@r_users .route('/users/get', methods=['GET'])
@auth.login_required
def getUser():
    # On fait tous les appels
    pseudo = request.args.get("pseudo")
    dic={}
    try:
        #On fait les appels pour construire le dictionnaire
        # dic["perso"]=json.loads(fetchList(f"select * from u_perso where pseudo='{pseudo}'"))[0]
        # dic["home"]=json.loads(fetchList(f"select * from u_home where pseudo='{pseudo}'"))[0]
        # dic["birth"]=json.loads(fetchList(f"select * from u_birth where pseudo='{pseudo}'"))[0]

        perso=fetchList(f"select * from u_perso where pseudo='{pseudo}'")
        home=fetchList(f"select * from u_home where pseudo='{pseudo}'")
        birth=fetchList(f"select * from u_birth where pseudo='{pseudo}'")

        if perso==[]:
            return Response("Username not Found",400)
        if home == []:
            return Response("Username not Found", 400)
        if birth == []:
            return Response("Username not Found", 400)

        dic["perso"]=json.loads(perso)[0]
        dic["home"] = json.loads(home)[0]
        dic["birth"] = json.loads(birth)[0]


        # Vérification que chaque dico contient une data
        print(dic)
        for key in dic.keys():
            if dic[key]==[]:
                return Response("No user found",400)
        # Modification du tinyint
        if dic["perso"]["male"] == "b'\\x01'":
            dic["perso"]["male"] = True
        else:
            dic["perso"]['male'] = False
        return Response(json.dumps(dic), 200)
    except Exception as e:
        print(str(e))
        return Response("Database Problem with object mapping", 500)


@r_users .route('/users/list', methods=['GET'])
@auth.login_required
def listUsers():
    try:
        #On fait tous les appels

        call1=json.loads(fetchList(f"select * from u_perso"))
        call2=json.loads(fetchList(f"select * from u_home"))
        call3=json.loads(fetchList(f"select * from u_birth"))

        #On vérifie que les objets on la même longueur

        if len(call1)!=len(call2):
            return Response("Database Problem with object mapping",500)
        if len(call1)!=len(call3):
            return Response("Database Problem with object mapping",500)

        #On modifie le tinytint

        for x in call1:
            if x["male"] == "b'\\x01'":
                x["male"] = True
            else:
               x["perso"]['male'] = False


        #On construit les objets de sortie

        users=[]
        for i in range(len(call1)):
            dic={}
            dic["perso"]=  call1[i]
            dic["home"] = call2[i]
            dic["birth"] = call3[i]
            users.append(dic)
        return Response(json.dumps(users),200)

    except Exception as e:
        print(str(e))
        return Response("Object Mapping Problem in the database", 500)


@r_users .route('/users/add', methods=['POST'])
def addUser():

        #1) On découpe le json

        req = request.get_json()
        js1 = req ["birth"]
        js2 = req ["home"]
        js3 = req ["perso"]
        #2) On check le token

        postToken = {}
        postToken["token"] = req["token"]
        postToken["prenom"] = req["perso"]["prenom"].lower()
        postToken["nom"] = req["perso"]["nom"].lower()

        resToken = validateTokenMan(postToken)
        if resToken == False:
            return Response("Token couldn't be validated",403)
        agent = getagent(req["token"])
        #3) On construit nos appels SQL

        pseudo = js3["prenom"][:4] + js3 ["nom"][:5] + js1 ["bdate"][-2:]
        pseudo = pseudo.lower()
        if js3['male']== True:
            male = 1
        else:
            male = 0


        if type(req) == list:
            return Response("Error in JSON Format posted", 400)
        if type(req) == dict:
            sql1 = "INSERT INTO u_birth (pseudo,bdate,bcity,bcodeP,bcountry) VALUES "
            sql2 = "INSERT INTO u_home (pseudo,adresse1,adresse2,city,codeP,country) VALUES "
            sql3 = "INSERT INTO u_perso (pseudo,male,nom,nom2,prenom,prenoms,agent) VALUES "
        try:
            sql1 += f'("{pseudo}","{js1["bdate"]}","{js1["bcity"]}","{js1["bcodeP"]}","{js1["bcountry"]}")'
            sql2 += f'("{pseudo}","{js2["adresse1"]}","{js2["adresse2"]}","{js2["city"]}","{js2["codeP"]}","{js2["country"]}")'
            sql3 += f'("{pseudo}",{male},"{js3["nom"]}","{js3["nom2"]}","{js3["prenom"]}","{js3["prenoms"]}","{agent}")'
        except KeyError:
            return Response("Json filed is not in the right format", 400)

        # 4) On fait les appels a la BDD

        try:
            postVariable(sql1)
            postVariable(sql2)
            postVariable(sql3)
            deleteToken(postToken)
            return Response("User Added",200)
        except Exception as e:
            print(e)
            return Response("Internal Server Error", 500)
