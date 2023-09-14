import time
import os
from src.models.Role import Role
from src.models.User import User

from flask import request, jsonify, session
from werkzeug.utils import secure_filename

from src import app, db
from src.services.Handlers import Handler, allowed_file

@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/login')
def login():

    return jsonify({'status': 'OK'})

@app.route('/register')
def register():
    _username = request.form.get('username')
    _email = request.form.get('email')
    _passwd = request.form.get('password')
    _role = request.form.get('role')

    roles_data = [role.name for role in Role.query.all()]
    role_id = Role.query.filter_by(name=_role).first()
    if not role_id:
        return {'status': 'ERROR', 'error': 'no role'}, 404
    if _role not in roles_data:
        return {'status': 'ERROR', 'error': 'no role'}, 404
    
    hashed_password = generate_password_hash(_passwd).decode()
    new_user = User(username=_username, email=_email, password=hashed_password, role_id=role_id.id)
    
    db.session.add(new_user)
    db.session.commit()
    return {'status': 'OK'}, 200
    # return jsonify({'status': 'OK'})

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files' not in request.files:
        return jsonify({'status': 'ERROR', 'ERROR': 'No file part'}), 400

    files = request.files.getlist('files')

    uploaded_files = []

    for file in files:
        if file.filename == '':
            continue

        if file and allowed_file(file.filename):
            original_filename = secure_filename(file.filename)
            filename = f"{str(int(time.time()))}.{original_filename}"  # Генерируем уникальное имя файла
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            uploaded_files.append({
                'filename': filename,
                'filepath': filepath
            })

        session['uploaded_filepath'] = filepath

    return jsonify({'status': 'OK', 'uploaded_files': uploaded_files}), 200



@app.route('/process', methods=['POST'])
def process_file():
    data = request.json
    path = data[0]['filepath']
    
    hnd = Handler(path)
    data = hnd.engine()


    return jsonify(data), 200


@app.route('/send', methods=['POST'])
def send_file():
    data = request.json

    return jsonify(data), 200