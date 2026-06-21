FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=8080
ENV DATABASE_PATH=/data/urban_services.db
ENV FLASK_ENV=production
ENV DEBUG=False

EXPOSE 8080

CMD gunicorn -w 2 -b 0.0.0.0:${PORT} app:app
