from flask import render_template, request, redirect, session
from flask_app import app
from flask_app.models.user import User
from flask_app.models import game_model

@app.route("/gamesetup", methods = ["POST"])
def setup():
    if game_model.validate_game(request.form["questions"]) == False:
        return redirect('/')
    game_data = [
        request.form["difficulty"],
        request.form["category"],
        request.form["questions"]
    ]
    
    url = f"https://opentdb.com/api.php?amount={game_data[2]}{game_data[1]}{game_data[0]}"
    
    session["game_setup"] = url
    return redirect("/game")