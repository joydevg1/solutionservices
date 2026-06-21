# Urban Services Web App

A React frontend with a Node.js backend, MySQL database, recommendation engine, LLM-powered chat support, and admin notification workflow.

## What is included

- `frontend/` - Vite + React app for browsing services, placing orders, chat, and admin login
- `backend/` - Express API with MySQL integration, order notifications, chat support, and admin configuration
- `backend/db_setup.sql` - schema and sample data for MySQL

## Setup

1. Install dependencies

   - Backend:
     ```powershell
     cd backend
     npm install
     ```
   - Frontend:
     ```powershell
     cd frontend
     npm install
     ```

2. Configure environment variables

   - Copy `backend/.env.example` to `backend/.env`
   - Set your MySQL credentials, email SMTP settings, and optional Twilio WhatsApp variables
   - Set `LLM_MODEL_PATH` to a local open-source model path or a compatible HuggingFace model location

3. Initialize MySQL

   - Run the SQL script in your MySQL client:
     ```sql
     source path/to/backend/db_setup.sql;
     ```

4. Start the backend

   ```powershell
   cd backend
   npm start
   ```

5. Start the frontend

   ```powershell
   cd frontend
   npm run dev
   ```

## Features

- Service listing with prices
- Recommendation system based on past purchases
- LLM-powered chat window using local knowledge base
- Out-of-context detection to avoid answering unrelated questions
- Admin login and configuration for email/WhatsApp order notifications

## Notes

- If LLM model loading fails, the app still works with fallback recommendation logic and chat will return a default response.
- For WhatsApp notifications, configure Twilio credentials in `backend/.env`.
