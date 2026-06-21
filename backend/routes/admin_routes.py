from flask import Blueprint, request, jsonify
from db_connection import execute_query, execute_insert_update
import jwt
import os
from dotenv import load_dotenv
from functools import wraps

load_dotenv()

admin_bp = Blueprint('admin', __name__)

JWT_SECRET = os.getenv('JWT_SECRET', 'secret_key')

def verify_token(f):
    """Decorator to verify JWT token for admin routes."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        header = request.headers.get('Authorization')
        if not header:
            return jsonify({'message': 'Missing authorization header.'}), 401
        
        try:
            token = header.split(' ')[1]
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            if payload.get('role') != 'admin':
                return jsonify({'message': 'Admin role required.'}), 403
            request.admin = payload
            return f(*args, **kwargs)
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token.'}), 401
    
    return decorated_function

@admin_bp.route('/config', methods=['GET'])
@verify_token
def get_config():
    """Get admin configuration."""
    try:
        query = """
            SELECT setting_key, setting_value FROM settings
            WHERE setting_key IN (?, ?)
        """
        rows = execute_query(query, ('notificationEmail', 'whatsappMessage'))
        config = {row['setting_key']: row['setting_value'] for row in rows} if rows else {}
        return jsonify(config), 200
    except Exception as e:
        print(f"Error retrieving admin config: {e}")
        return jsonify({'message': 'Unable to retrieve admin config.'}), 500

@admin_bp.route('/config', methods=['POST'])
@verify_token
def update_config():
    """Update admin configuration."""
    data = request.get_json()
    notification_email = data.get('notificationEmail') or os.getenv('NOTIFICATION_EMAIL', '')
    whatsapp_message = data.get('whatsappMessage', '')
    
    try:
        # Update or insert settings
        query_email = "INSERT OR REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)"
        query_message = "INSERT OR REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)"
        
        execute_insert_update(query_email, ('notificationEmail', notification_email))
        execute_insert_update(query_message, ('whatsappMessage', whatsapp_message))
        
        return jsonify({'message': 'Admin configuration updated.'}), 200
    except Exception as e:
        print(f"Error updating admin config: {e}")
        return jsonify({'message': 'Unable to update admin config.'}), 500
