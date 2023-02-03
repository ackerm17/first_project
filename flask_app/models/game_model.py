from flask import flash

def validate_game(number):
    is_valid = True
    if int(number) < 1:
        is_valid = False
        flash("Number of questions must be greater than zero.", "questions")
        flash("Like what did you expect a game with 0 or less questions to look like.", "questions")
    if int(number) > 50:
        is_valid = False
        flash("Number cannot cannot exceed 50", "questions")
        flash("I know it's a bummer innit", "questions")
    return is_valid