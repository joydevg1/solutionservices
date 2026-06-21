# Urban Services Backend - Python Version

This is the Python/Flask backend for the Urban Services marketplace application.

## Setup

### Prerequisites
- Python 3.8 or higher
- MySQL database

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create a `.env` file in the backend directory:**
   ```
   PORT=5000
   DEBUG=False

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=urban_services

   # JWT Configuration
   JWT_SECRET=your_secret_key_here

   # Admin Credentials
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123

   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

   # Twilio Configuration (Optional)
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_FROM=whatsapp:+1234567890
   TWILIO_WHATSAPP_TO=whatsapp:+1234567890

   # Notification Email
   NOTIFICATION_EMAIL=admin@example.com

   # LLM Model Configuration
   LLM_MODEL_PATH=gpt2
   ```

3. **Set up the database:**
   ```bash
   mysql -u root < db_setup.sql
   ```

### Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Admin login

### Services
- **GET** `/api/services` - Get all available services
- **GET** `/api/services/recommendations` - Get personalized recommendations (query param: email)

### Orders
- **POST** `/api/order` - Place a new order

### Chat
- **POST** `/api/chat` - Send a chat message

### Admin
- **GET** `/api/admin/config` - Get admin configuration (requires JWT token)
- **POST** `/api/admin/config` - Update admin configuration (requires JWT token)

### Health
- **GET** `/api/health` - Health check endpoint

## Project Structure

```
backend/
├── app.py                     # Main Flask application
├── requirements.txt           # Python dependencies
├── db_connection.py          # Database connection utilities
├── llm_utils.py              # Language model utilities
├── recommendation.py         # Recommendation engine
├── db_setup.sql              # Database schema
├── data/
│   └── knowledge_base.py     # Service knowledge base
└── routes/
    ├── auth_routes.py        # Authentication routes
    ├── services_routes.py    # Services routes
    ├── order_routes.py       # Order routes
    ├── chat_routes.py        # Chat routes
    └── admin_routes.py       # Admin routes
```

## Technologies Used

- **Framework:** Flask
- **Database:** MySQL
- **Authentication:** JWT (PyJWT)
- **Password Hashing:** bcrypt
- **LLM:** Hugging Face Transformers
- **Email:** SMTP (smtplib)
- **SMS/WhatsApp:** Twilio API

## Notes

- The LLM functionality requires downloading models from Hugging Face. Default model is GPT-2.
- Email and Twilio configurations are optional but recommended for production.
- Make sure your MySQL database is running and accessible with the configured credentials.
