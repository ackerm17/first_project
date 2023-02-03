# import the function that will return an instance of a connection
from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re
# model the class after the friend table from our database
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$') 
class User:
    def __init__( self , data ):
        self.id = data['id']
        self.email = data['email']
        self.username = data['username']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
    # Now we use class methods to query our database
    @classmethod
    def get_all(cls):
        query = "SELECT * FROM users;"
        # make sure to call the connectToMySQL function with the schema you are targeting.
        results = connectToMySQL('trivia_game_schema').query_db(query)
        # Create an empty list to append our instances of friends
        users = []
        # Iterate over the db results and create instances of friends with cls.
        for user in results:
            users.append( cls(user) )
        return users

    @classmethod
    def get_by_id(cls,data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL('trivia_game_schema').query_db(query, data)
        if len(results) < 1:
            return False
        return cls(results[0])

    @classmethod
    def create_account(cls, data):
        query = "INSERT INTO users(email, username, password) VALUES(%(email)s, %(username)s, %(password)s)"
        return connectToMySQL('trivia_game_schema').query_db(query, data)

    @staticmethod
    def validate_account(data):
        is_valid = True
        if len(data['username']) < 2:
            is_valid = False
            flash("You can't have a username that is less than two characters", "user")
        if not EMAIL_REGEX.match(data['email']):
            is_valid = False
            flash("You're email is invalid", "mail")
        if len(data['pass']) < 8:
            is_valid = False
            flash("Your password needs to be at least 8 characters", "passw")
        if data['pass'] != data['conpass']:
            is_valid = False
            flash("Your password and confirmation password do not match", "passw")
        return is_valid

    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL('trivia_game_schema').query_db(query, data)
        if len(results) < 1:
            return False
        return cls(results[0])