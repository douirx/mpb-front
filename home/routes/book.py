from flask import Blueprint, render_template,request


r_book = Blueprint('book', __name__,)

@r_book.route('/bookmaker', methods=['GET'])
def bookPage():
    book=request.args.get("name")
    if book is None:
        return render_template('404.html',name="Erreur 404"), 404
    else:
        listBooks=[]
        listBooks.append("betclic");
        listBooks.append("winamax");
        listBooks.append("unibet");
        listBooks.append("parions-sport");
        listBooks.append("bwin");
        listBooks.append("zebet");
        listBooks.append("pmu");
        listBooks.append("pokerstars");
        listBooks.append("france-pari");
        listBooks.append("vbet");
        listBooks.append("netbet");
        listBooks.append("genybet");
        listBooks.append("barriere-bet");
        listBooks.append("joabet");
        listBooks.append("partouche-sport");
        listBooks.append("feeling-bet");
        listBooks.append("betway");
        if book in listBooks:
            fname=f"img/{book}.png"
            return render_template('bookmaker.html',name=book,fname=fname)
        else:
            return render_template('404.html',name="Erreur 404"), 404