#!/bin/bash
set -e
pg_ctlcluster 15 main start
for i in $(seq 1 60); do pg_isready -q && break; sleep 1; done
npx prisma db seed
exec npm start -- -p $PORT -H 0.0.0.0
