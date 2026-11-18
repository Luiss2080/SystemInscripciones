FROM node:24-bookworm
ENV DEBIAN_FRONTEND=noninteractive NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y --no-install-recommends postgresql openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
ENV DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/sistema_inscripciones?schema=public"
ENV JWT_SECRET="demo-jwt-secret-hagamostech-inscripciones-2026"
ENV INITIAL_ADMIN_EMAIL="admin@hagamostech.com"
ENV INITIAL_ADMIN_PASSWORD="password"
ENV NEXT_PUBLIC_APP_URL="https://systeminscripciones.onrender.com"
RUN chmod +x docker/demo-build.sh docker/demo-entrypoint.sh && ./docker/demo-build.sh
ENV PORT=10000
EXPOSE 10000
CMD ["./docker/demo-entrypoint.sh"]
