from src import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32))
    email = db.Column(db.String(32))
    password = db.Column(db.String(256))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    role = db.relationship("Role")