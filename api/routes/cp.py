from flask import Blueprint
from jsons import NoneType

from config.pwd import auth
from config.mariadb1 import fetchList,postVariable
from flask import Response,request
import json

r_cp = Blueprint('cp', __name__,)

@r_cp.route('/cp/list', methods=['GET'])
@auth.login_required
def listCp():
    try:
        res =  fetchList("select * from cp")
        if res == []:
           return json.loads('{}')
        else:
           return res
    except:
        return Response("Internal Server Error", 500)

@r_cp.route('/cp/list/book', methods=['GET'])
@auth.login_required
def listCpBook():
    book=request.args.get("book")
    if type(book)!=str:
        return Response("No correct book filed,400")
    try:
        res = fetchList(f"select * from cp where book='{book}'")
        if res == []:
            return json.loads('{}')
        else:
            return res
    except:
        return Response("Internal Server Error", 500)

@r_cp.route('/cp/addList', methods=['POST'])
@auth.login_required
def addCpList():
    req = request.get_json()
    if type(req) != dict:
        if type(req) != list:
            return Response("No Json Post", 400)
    elif type(req)==dict:
        req=[req]
    sql = "INSERT INTO cp (nom,book,pyt-decode,pyt-encode) VALUES "
    for i in range(len(req)):
        resi=req[i]
        try :
            sql += f"('{resi['type']}','{resi['product']}','{resi['msg']}'),"
        except KeyError:
            return Response("Json filed is not in the right format", 400)
    try:
        postVariable(sql[:-1])
        return "ListMsgsAdded"
    except:
        return Response("Internal Server Error", 500)



@r_cp.route('/cp/deleteMix', methods=['PUT'])
@auth.login_required
def deleteCpMix():
    nom = request.args.get('nom')
    book = request.args.get('book')
    if type(nom)==NoneType:
        return Response("Type must be filed",400)
    if type(book)==NoneType:
        return Response("Product must be filed",400)
    sql = f"DELETE FROM cp WHERE nom='{nom}' and book='{book}'"
    try:
        postVariable(sql)
        return f"product {nom} with type {book} has been deleted"
    except:
        return Response("Internal Server Error", 500)
