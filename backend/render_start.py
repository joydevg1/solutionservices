"""Initialize SQLite then start Gunicorn (Render start command)."""
import os
import subprocess
import sys

from db_init import setup_database


def main():
    setup_database()
    port = os.environ.get("PORT", "8080")
    cmd = ["gunicorn", "-w", "2", "-b", f"0.0.0.0:{port}", "app:app"]
    sys.exit(subprocess.call(cmd))


if __name__ == "__main__":
    main()
