# Sistema de Inscripciones - Talleres y Conferencias para Ingenieros

Este proyecto es una plataforma integral para la gestión, promoción, registro y certificación de conferencias y talleres técnicos dictados por un Ingeniero de Sistemas.

## Metodología: Spec-Driven Development (SDD)
El proyecto se rige de manera estricta por el ciclo SDD:
1. **Fase 1: Especificación Formal (`spec-generator`)**: Definición exhaustiva de Requisitos Funcionales (RF), Requisitos No Funcionales (RNF) y Casos de Uso en `docs/specs/spec.md`.
2. **Fase 2: Arquitectura y Modelado (`database-architect`, `security-expert`, `ui-ux-designer`)**: Esquema de datos normalizado (PostgreSQL), seguridad (JWT HttpOnly, RBAC, Zod DTOs) y sistema de diseño (Tailwind CSS, estética moderna técnica/dark mode).
3. **Fase 3 & 4: Implementación (`sdd-implement`, `backend-developer`, `frontend-developer`)**: Desarrollo modular, Server/Client Components, Clean Architecture/Use Cases, integración de QR y emisión de certificados.
4. **Fase 5: Validación y QA (`qa-automation`, `sdd-validate`)**: Cobertura de pruebas unitarias y E2E asociadas a cada RF.

## Stack Tecnológico
- **Frontend**: Next.js (React 19 / App Router), TypeScript, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: Next.js Route Handlers / Server Actions con Clean Architecture (DTOs con Zod, casos de uso desacoplados).
- **Base de Datos**: PostgreSQL 18 (Localhost: 5432, BD: `sistema_inscripciones`).
- **ORM / Migraciones**: Prisma ORM con migraciones versionadas y tipado seguro.
- **MCP Server**: PostgreSQL MCP (`@modelcontextprotocol/server-postgres`) para consultas e inspección en vivo del esquema y datos.

