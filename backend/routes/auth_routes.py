from flask import Blueprint, request, jsonify
import jwt
import bcrypt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint('auth', __name__)

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'admin@example.com')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')
JWT_SECRET = os.getenv('JWT_SECRET', 'secret_key')

def compare_password(input_password, stored_password):
    """Compare input password with stored password (hashed or plain)."""
    if stored_password.startswith('$2a$') or stored_password.startswith('$2b$'):
        return bcrypt.checkpw(input_password.encode(), stored_password.encode())
    return input_password == stored_password

@auth_bp.route('/login', methods=['POST'])
def login():
    """Admin login endpoint."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required.'}), 400
    
    if email != ADMIN_EMAIL or not compare_password(password, ADMIN_PASSWORD):
        return jsonify({'message': 'Invalid admin credentials.'}), 401
    
    token = jwt.encode(
        {
            'email': email,
            'role': 'admin',
            'exp': datetime.utcnow() + timedelta(hours=6)
        },
        JWT_SECRET,
        algorithm='HS256'
    )
    
    return jsonify({'token': token}), 200
