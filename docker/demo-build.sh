#!/bin/bash
set -e
pg_ctlcluster 15 main start
for i in $(seq 1 30); do pg_isready -q && break; sleep 1; done
su postgres -c "psql -c \"ALTER USER postgres PASSWORD 'postgres'\""
su postgres -c "createdb sistema_inscripciones"
npx prisma migrate deploy
npx prisma db seed
npm run build
pg_ctlcluster 15 main stop
