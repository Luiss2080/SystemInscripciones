# Guía de contribución

¡Gracias por querer aportar a SystemInscripciones!

## Cómo proponer cambios

1. Abre un issue describiendo el bug o la idea antes de empezar un cambio grande.
2. Haz un fork y crea una rama con un nombre claro (`fix/descripcion`, `feat/descripcion`).
3. Mantén el cambio pequeño y enfocado: una cosa por PR.
4. Antes de abrir un PR ejecuta `npm run lint` y `npm run test:sdd`, y agrega pruebas cuando cambies reglas de negocio (cupos, duplicidad, firma del QR).
5. Corre `npm test` y confirma que todo pasa antes de abrir el PR.

## Estilo

- TypeScript estricto; valida toda entrada con Zod.
- Los cambios de esquema van solo con migraciones de Prisma.
- Nunca subas `.env`, claves ni credenciales.
- Mensajes de commit en español, con prefijo (`feat:`, `fix:`, `docs:`, `chore:`).

## Reportar problemas de seguridad

No abras un issue público: sigue la [política de seguridad](SECURITY.md).
