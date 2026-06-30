#!/usr/bin/env bash
set -e
python -c "from db_init import setup_database; setup_database()"
exec gunicorn -w 2 -b "0.0.0.0:${PORT:-8080}" app:app
