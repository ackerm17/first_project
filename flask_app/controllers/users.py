from flask import render_template, request, redirect, session
from flask_app import app
from flask_app.models.user import User
from flask import flash
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app) 

@app.route('/')
def index():
    users = User.get_all()
    print(users)
    return render_template("index.html", all_users = users)

@app.route('/game')
def game():

    return render_template("game.html")

@app.route('/createaccount')
def create():

    return render_template("create.html")

@app.route('/validateaccount', methods = ['POST'])
def confirmcreation():
    if not User.validate_account(request.form):
        return redirect('/createaccount')
    pw_hash = bcrypt.generate_password_hash(request.form['pass'])
    print(pw_hash)
    data = {
        "username": request.form["username"],
        "email": request.form["email"],
        "password": pw_hash,
    }
    session['user_id'] = User.create_account(data)
    mail = {
        "email": request.form["email"]
    }
    user_in_db = User.get_by_email(mail)
    session['username'] = user_in_db.username

    return redirect('/')

@app.route('/login', methods = ["POST"])
def login():
    # see if the username provided exists in the database
    data = { "email" : request.form["emaillog"] }
    user_in_db = User.get_by_email(data)
    # user is not registered in the db
    if not user_in_db:
        flash("Invalid Email/Password", "log")
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db.password, request.form['passwordlog']):
        # if we get False after checking the password
        flash("Invalid Email/Password", "log")
        return redirect('/')
    # if the passwords matched, we set the user_id into session
    session['user_id'] = user_in_db.id
    session['username'] = user_in_db.username
    # never render on a post!!!
    return redirect("/")

@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/')