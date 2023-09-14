from src import db

file_role_table = db.Table('file_role',
                           db.Column('file_id', db.Integer, db.ForeignKey('files.id')),
                           db.Column('role_id', db.Integer, db.ForeignKey('roles.id')))