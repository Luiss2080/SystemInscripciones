# Sistema de Inscripciones, Acreditación QR y Certificación para Talleres y Conferencias Técnicas

Plataforma de alto rendimiento diseñada para la gestión, promoción, registro transaccional, control de acceso mediante códigos QR en vivo y certificación digital de talleres y conferencias dictados por un Ingeniero de Sistemas.

Construido siguiendo la metodología **Spec-Driven Development (SDD)** con **Clean Architecture**, **React 19**, **Next.js (App Router)**, **Tailwind CSS**, **Prisma ORM** y **PostgreSQL**.

---

## 🚀 Características Principales

### 🌐 Portal Público de Asistentes
- **Catálogo de Eventos Técnicos:** Talleres prácticos hands-on, masterclasses y conferencias con filtros dinámicos y aforo en tiempo real.
- **Detalle Granular del Taller (`/eventos/[slug]`):** Temario modular, prerrequisitos de hardware/software, ponente y recursos preparatorios (GitHub, slides).
- **Inscripción Transaccional:** Validación estricta con Zod y transacciones ACID en PostgreSQL para evitar condiciones de carrera o sobrecupo.
- **Pase Digital con QR Único (`/tickets/[code]`):** Ticket estilo credencial técnica con código QR vectorizado, firmado con hash SHA-256 para validación instantánea.
- **Verificador Oficial de Certificados (`/verificar` y `/verificar/[code]`):** Portal público para que reclutadores o instituciones verifiquen la autenticidad y horas académicas de los certificados emitidos.

### 🛡️ Panel Administrativo del Ingeniero Organizador
- **Autenticación Robusta:** Sesión mediante Cookies `HttpOnly`, `SameSite=Lax` y tokens JWT con contraseñas encriptadas con `bcrypt`.
- **Dashboard de Métricas en Vivo (`/admin`):** Contadores de aforo ocupado, inscritos globales, tasa de asistencia porcentual y lista de registros recientes.
- **Control de Acreditación QR en Tiempo Real (`/admin/checkin`):** Escáner integrado para usar la cámara web o smartphone en la entrada del evento. Valida el ticket, marca el estado `ATTENDED` con marca de tiempo y detecta tickets reutilizados o duplicados.
- **Gestión de Talleres (`/admin/eventos` y `/admin/eventos/nuevo`):** Programador de eventos con definición de horas académicas, aforo, fechas y temarios en Markdown.
- **Directorio de Asistentes (`/admin/asistentes`):** Búsqueda instantánea, check-in manual y exportación masiva a formato CSV.
- **Emisión de Certificados Digitales (`/admin/certificados`):** Generación automática de códigos de certificación oficial para todos los asistentes que completaron el check-in.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | React 19, Next.js (App Router), Tailwind CSS (Dark Tech UI), Lucide Icons, Canvas Confetti |
| **Backend** | Next.js Server Actions, DTOs con Zod, Clean Architecture |
| **Base de Datos** | PostgreSQL 18 (Localhost: 5432) |
| **ORM & Migraciones** | Prisma ORM 6 con esquema relacional 3NF y Soft Deletes |
| **Acreditación QR** | `qrcode` (generación vectorizada) y `html5-qrcode` (lector de cámara en vivo) |
| **Seguridad** | `bcryptjs` (hashing de contraseñas), `jsonwebtoken` (sesión segura en cookies HttpOnly) |
| **Testing** | Suite de validación automatizada SDD con `tsx` |

---

## 📂 Estructura del Proyecto

```
SystemInscripciones/
├── docs/
│   └── specs/
│       └── spec.md              # Especificación Formal SDD (18 Requisitos Funcionales y Modelo ER)
├── prisma/
│   ├── schema.prisma            # Esquema relacional PostgreSQL (users, events, registrations, tickets, etc.)
│   ├── seed.ts                  # Datos semilla (Admin, 3 eventos iniciales y asistente de prueba)
│   └── migrations/              # Migraciones versionadas de base de datos
├── src/
│   ├── actions/                 # Server Actions transaccionales (registro, check-in, auth, certificados)
│   ├── app/                     # Next.js App Router
│   │   ├── admin/               # Panel administrativo, check-in QR, eventos y certificados
│   │   ├── eventos/[slug]/      # Landing y formulario de registro del taller
│   │   ├── tickets/[code]/      # Pase digital con código QR de acceso
│   │   ├── verificar/           # Verificador público de diplomas
│   │   ├── globals.css          # Sistema de diseño Tailwind CSS Dark Tech
│   │   ├── layout.tsx           # Layout global con Navbar y Footer
│   │   └── page.tsx             # Home con catálogo y perfil profesional
│   ├── components/              # Componentes UI reutilizables
│   └── lib/                     # Prisma singleton, validaciones Zod, utilidades y Auth
└── tests/
    └── sdd-validation.ts        # Suite de pruebas automatizadas E2E de reglas de negocio
```

---

## ⚙️ Configuración y Puesta en Marcha

### 1. Variables de Entorno (`.env`)
Asegúrate de que el archivo `.env` contenga la cadena de conexión a PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sistema_inscripciones?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="sistema-inscripciones-jwt-secret-key-super-secure-2026-prod"
INITIAL_ADMIN_EMAIL="admin@ingeniero.tech"
INITIAL_ADMIN_PASSWORD="AdminPassword2026!"
```

### 2. Migraciones y Seed Inicial
Ejecutar las migraciones e insertar los datos iniciales de prueba:
```bash
npx prisma migrate dev
npx prisma db seed
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### 4. Credenciales de Administrador
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@ingeniero.tech`
- **Contraseña:** `AdminPassword2026!`

---

## 🧪 Pruebas Automatizadas (QA - Fase 5 SDD)

Para validar todos los requisitos funcionales del sistema (bloqueo por cupos agotados, prevención de duplicidad, check-in y certificación):
```bash
npm run test:sdd
```
Todos los 8 casos de prueba pasan al 100%.

---

## 📄 Licencia y Autor
Desarrollado por el **Ing. Alex Martínez** - Systems Engineer & Cloud Architect.
Licencia MIT.
