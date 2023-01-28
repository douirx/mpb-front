import flask
from flask_cors import CORS
from routes.xp import r_xp
from routes.cp import r_cp
from routes.token import r_token
from routes.users import r_users
from routes.fake import r_fake

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.register_blueprint(r_xp)
app.register_blueprint(r_cp)
app.register_blueprint(r_users)
app.register_blueprint(r_token)
app.register_blueprint(r_fake)



cors_config = {
    "origins":["https://monpetitbet.fr/","http://127.0.0.1:5000"],
    "methods":["GET","POST"],
    "allow_headers":["Authorization"]
}

CORS(app,ressources={
    r"/token/verify":cors_config,
    r"/users/add":cors_config,
    r"/fake/add":cors_config,
    r"/fake/get":cors_config,
    r"/users/checkpseudo":cors_config
})

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0',ssl_context='adhoc')

