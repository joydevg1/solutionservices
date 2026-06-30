import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.getenv(
    "DATABASE_PATH",
    os.path.join(os.path.dirname(__file__), "urban_services.db"),
)

def _ensure_db_dir():
    db_dir = os.path.dirname(os.path.abspath(DB_PATH))
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)

def get_db_connection():
    """Create and return a SQLite database connection."""
    try:
        _ensure_db_dir()
        connection = sqlite3.connect(DB_PATH)
        connection.row_factory = sqlite3.Row  # Return rows as dictionaries
        return connection
    except Exception as e:
        print(f"Error connecting to SQLite: {e}")
        return None

@contextmanager
def get_db():
    """Context manager for database connections."""
    conn = get_db_connection()
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"Database error: {e}")
    finally:
        conn.close()

def execute_query(query, params=None):
    """Execute a SELECT query and return results."""
    connection = get_db_connection()
    if connection is None:
        return None
    
    try:
        cursor = connection.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return [dict(row) for row in result]
    except Exception as e:
        print(f"Error executing query: {e}")
        return []
    finally:
        connection.close()

def execute_insert_update(query, params=None):
    """Execute an INSERT or UPDATE query and return the inserted ID."""
    connection = get_db_connection()
    if connection is None:
        return None
    
    try:
        cursor = connection.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        connection.commit()
        result = cursor.lastrowid if cursor.lastrowid else cursor.rowcount
        cursor.close()
        return result
    except Exception as e:
        print(f"Error executing query: {e}")
        connection.rollback()
        return None
    finally:
        connection.close()

