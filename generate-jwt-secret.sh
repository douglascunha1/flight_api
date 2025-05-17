#!/bin/sh

ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "[INFO] .env not found. Generating JWT_SECRET..."
  JWT_SECRET=$(openssl rand -hex 32)
  echo "JWT_SECRET=$JWT_SECRET" > "$ENV_FILE"
  echo "[INFO] JWT_SECRET saved to $ENV_FILE"
else
  echo "[INFO] .env already exists. Checking JWT_SECRET..."

  if ! grep -q "^JWT_SECRET=" "$ENV_FILE" || [ -z "$(grep '^JWT_SECRET=' "$ENV_FILE" | cut -d '=' -f2)" ]; then
    echo "[INFO] JWT_SECRET is missing or empty. Generating new secret..."
    JWT_SECRET=$(openssl rand -hex 32)

    sed -i '/^JWT_SECRET=/d' "$ENV_FILE"
    echo "JWT_SECRET=$JWT_SECRET" >> "$ENV_FILE"
    echo "[INFO] JWT_SECRET updated in $ENV_FILE"
  else
    echo "[INFO] JWT_SECRET already set. No changes made."
  fi
fi

exec "$@"
