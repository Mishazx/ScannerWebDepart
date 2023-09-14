from src import db
from Main import file_role_table

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    name = db.Column(db.String(20))
    files = db.relationship('File', secondary=file_role_table, back_populates='roles')