from flask import Blueprint
from jsons import NoneType

from config.pwd import auth
from config.mariadb1 import fetchList,postVariable
from flask import Response,request
import json

r_xp = Blueprint('xp', __name__,)

@r_xp .route('/xp/list', methods=['GET'])
@auth.login_required
def listXp():
    try:
        res = fetchList("select * from xp")
        if res == []:
            return json.loads('{}')
        else:
            return res
    except:
        return Response("Internal Server Error", 500)


@r_xp .route('/xp/list/book', methods=['GET'])
@auth.login_required
def listXpBook():
    book=request.args.get("book")
    if type(book)!=str:
        return Response("No correct book filed,400")
    try:
        res = fetchList(f"select * from xp where book='{book}' order by ordre")
        if res == []:
            return json.loads('{}')
        else:
            return res
    except:
        return Response("Internal Server Error", 500)

@r_xp .route('/xp/addList', methods=['POST'])
@auth.login_required
def addXPList():
    req = request.get_json()
    if type(req) != dict:
        if type(req) != list:
            return Response(str(type(req))+" No Json Post", 400)
    elif type(req) == dict:
        req = [req]
    sql = "INSERT INTO xp (ordre,nom,type,wait,book,xpath) VALUES "
    for i in range(len(req)):
        reqi=req[i]
        try:
            print(reqi)
            sql += f"({reqi['ordre']},'{reqi['nom']}','{reqi['type']}',{reqi['wait']},'{reqi['book']}','{reqi['xpath']}'),"
            
        except:
            return Response("Json in the list has incorrect format",400)
    try:
        postVariable(sql[:-1])
    except Exception as e:
        print(e)
        return Response("ISS",500)
    return "ListXpAdded"


@r_xp .route('/xp/deleteMix', methods=['PUT'])
@auth.login_required
def deleteXpMix():
    nom = request.args.get('nom')
    book = request.args.get('book')
    if type(nom)==NoneType:
        return Response("Type must be filed",400)
    if type(book)==NoneType:
        return Response("Product must be filed",400)
    sql = f"DELETE FROM xp WHERE nom='{nom}' and book='{book}'"
    try:
        postVariable(sql)
        return f"nom {nom} with book {book} has been deleted"
    except:
        return Response("Internal Server Error", 500)

