from flask import Blueprint, render_template,request
import requests
from jsons import NoneType
from config.pwd import auth
from config.pwdAdm import auth as auth2

r_reg = Blueprint('reg', __name__,)


@r_reg.route('/register/', methods=['GET'])
def indexPage():
    token=request.args.get("token")
    urlBase="https://monpetitbet.fr/api/token/verify?id="
    if type(token)==NoneType:
        return render_template("error.html")
    url=urlBase+token
    req=requests.get(url)
    if req.status_code==200:
        return render_template('registration.html')
    else:
        return render_template("error.html")

@r_reg.route('/register/loc', methods=['GET'])
def indexPageLoc():
    token=request.args.get("token")
    urlBase="http://127.0.0.1:5001/token/verify?id="
    if type(token)==NoneType:
        return render_template("error.html")
    url=urlBase+token
    req=requests.get(url)
    if req.status_code==200:
        return render_template('registration.html')
    else:
        return render_template("error.html")

@r_reg.route('/register/token', methods=['GET'])
@auth.login_required
def tokenPage():
    agent=auth.username()
    return render_template('token.html',agent=agent)


@r_reg.route('/register/fake', methods=['GET'])
@auth2.login_required
def fakePage():
    return render_template('fake.html')


