#!/bin/sh

ENV_FILE=".env"

generate_or_update_var() {
  VAR_NAME="$1"
  DEFAULT_VALUE="$2"

  if ! grep -q "^$VAR_NAME=" "$ENV_FILE" || [ -z "$(grep "^$VAR_NAME=" "$ENV_FILE" | cut -d '=' -f2-)" ]; then
    echo "[INFO] $VAR_NAME is missing or empty. Adding default value..."
    sed -i "/^$VAR_NAME=/d" "$ENV_FILE"
    echo "$VAR_NAME=$DEFAULT_VALUE" >> "$ENV_FILE"
  else
    echo "[INFO] $VAR_NAME already set. No changes made."
  fi
}

if [ ! -f "$ENV_FILE" ]; then
  echo "[INFO] .env not found. Creating and generating variables..."
  touch "$ENV_FILE"
fi

if ! grep -q "^JWT_SECRET=" "$ENV_FILE" || [ -z "$(grep '^JWT_SECRET=' "$ENV_FILE" | cut -d '=' -f2-)" ]; then
  echo "[INFO] JWT_SECRET is missing or empty. Generating new secret..."
  JWT_SECRET=$(openssl rand -hex 32)
  sed -i '/^JWT_SECRET=/d' "$ENV_FILE"
  echo "JWT_SECRET=$JWT_SECRET" >> "$ENV_FILE"
else
  echo "[INFO] JWT_SECRET already set. No changes made."
fi

generate_or_update_var "POSTGRES_USER" "postgres_user"
generate_or_update_var "POSTGRES_PASSWORD" "secure_password_123"
generate_or_update_var "POSTGRES_DB" "demo_flight"
generate_or_update_var "REDIS_URL" "redis://redis:6379"
generate_or_update_var "DATABASE_URL" 'postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}'

exec "$@"
