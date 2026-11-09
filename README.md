<div align="center">
  <img src="docs/assets/logo.svg" width="96" alt="Logo de SystemInscripciones" />
  <h1>🎟️ SystemInscripciones</h1>
  <p><b>Inscripciones, tickets con QR, check-in en vivo y certificados verificables para talleres y conferencias técnicas.</b></p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/licencia-MIT-yellow?style=for-the-badge" alt="Licencia MIT" />
  <img src="https://img.shields.io/badge/PRs-bienvenidos-brightgreen?style=for-the-badge" alt="PRs bienvenidos" />
  <p>
    <a href="#-características-principales">Características</a> ·
    <a href="#-stack-tecnológico">Stack</a> ·
    <a href="#-estructura-del-proyecto">Estructura</a> ·
    <a href="#-configuración-y-puesta-en-marcha">Puesta en marcha</a> ·
    <a href="#-pruebas-automatizadas">Pruebas</a> ·
    <a href="#-contribuir">Contribuir</a>
  </p>
</div>

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

## 🧰 Stack Tecnológico

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

## 🔧 Configuración y Puesta en Marcha

### 1. Variables de Entorno (`.env`)
Asegúrate de que el archivo `.env` contenga la cadena de conexión a PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sistema_inscripciones?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="cambia-este-valor-por-un-secreto-largo-y-aleatorio"
INITIAL_ADMIN_EMAIL="admin@example.com"
INITIAL_ADMIN_PASSWORD="cambia-esta-clave"
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

### 4. Acceso de Administrador
- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Credenciales:** las que definiste en `INITIAL_ADMIN_EMAIL` e `INITIAL_ADMIN_PASSWORD` dentro de tu `.env` (el seed las usa para crear el primer administrador). No subas ese archivo al repositorio.

---

## 🧪 Pruebas Automatizadas

Para validar todos los requisitos funcionales del sistema (bloqueo por cupos agotados, prevención de duplicidad, check-in y certificación):
```bash
npm run test:sdd
```
La suite cubre los requisitos funcionales críticos y se ejecuta también en CI al abrir un pull request.

---

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Lee la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md) antes de abrir un PR. Para bugs o ideas abre un issue; los problemas de seguridad se reportan según la [política de seguridad](SECURITY.md). ¿Dudas? Mira [SUPPORT.md](SUPPORT.md). Los cambios por versión están en el [CHANGELOG](CHANGELOG.md).

---

## 📄 Licencia

Distribuido bajo la licencia [MIT](LICENSE).

---

<div align="center">
  <sub>Hecho por <a href="https://github.com/Luiss2080">Luiss2080</a></sub>
</div>
