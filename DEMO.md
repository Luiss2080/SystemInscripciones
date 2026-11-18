# Demo pública de SystemInscripciones

Rama `demo`: despliegue en Render con Docker. Un solo contenedor con PostgreSQL embebido y la app Next.js. No usa base de datos externa.

## Accesos

- Panel de administración: /admin/login
- Administrador: admin@hagamostech.com / password
- Docente: docente@ingeniero.tech / DocentePassword2026!
- Staff: staff@ingeniero.tech / StaffPassword2026!

## Notas

- El seed crea 6 eventos, inscripciones, tickets con QR y certificados de ejemplo, con precios en bolivianos.
- Render gratis duerme el servicio tras un rato sin uso: la primera visita tarda cerca de 1 minuto y los datos se reinician en cada arranque.
- Esta rama no cambia `master`.
