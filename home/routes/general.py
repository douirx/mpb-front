from flask import Blueprint, render_template


r_general = Blueprint('general', __name__,)

@r_general.route('/', methods=['GET'])
def indexPage():
    return render_template('index.html')

@r_general.route('/mentions-legales', methods=['GET'])
def mentionsPage():
    return render_template('mentions.html',name="Mentions Légales")

@r_general.errorhandler(404)
def not_found_error(error):
    return render_template('404.html',name="Erreur 404"), 404