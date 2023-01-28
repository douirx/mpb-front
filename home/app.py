import flask
from routes.book import r_book
from routes.debutant import r_debutant
from routes.reg import r_reg
from routes.general import r_general, not_found_error

app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.register_blueprint(r_book)
app.register_blueprint(r_debutant)
app.register_blueprint(r_general)
app.register_blueprint(r_reg)
app.register_error_handler(404, not_found_error)

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0',ssl_context='adhoc')

