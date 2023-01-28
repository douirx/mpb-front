from flask import Blueprint, render_template,request


r_debutant = Blueprint('debutant', __name__)

@r_debutant.route('/beginner', methods=['GET'])
def debutantPage():
    name = request.args.get("name")
    if name is None:
        return render_template('404.html'), 404
    else:
        if name=="sports":
            title="Les Sports"
            return render_template('beginner.html',name=name,img=0,title=title)
        elif name=="paris-sportifs":
            title="Les Paris Sportifs"
            return render_template('beginner.html', name=name, img=1, title=title)
        elif name=="bookmakers":
            title = "Qu'est-ce qu'un bookmaker"
            return render_template('beginner.html', name=name, img=1, title=title)
        else:
            return render_template('404.html'), 404