import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de base de datos...");

  // 1. Limpiar base de datos para ambiente limpio de desarrollo
  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.eventResource.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // 2. Crear Usuario Administrador (Ingeniero de Sistemas)
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@ingeniero.tech";
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || "AdminPassword2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      fullName: "Ing. Alex Martínez - Systems Engineer & Cloud Architect",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`👤 Usuario Administrador creado: ${admin.email}`);

  // Fechas relativas dinámicas
  const now = new Date();
  const dateEvent1Start = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // En 5 días
  dateEvent1Start.setHours(18, 0, 0, 0);
  const dateEvent1End = new Date(dateEvent1Start.getTime() + 4 * 60 * 60 * 1000); // 4 horas de duración

  const dateEvent2Start = new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000); // En 12 días
  dateEvent2Start.setHours(15, 0, 0, 0);
  const dateEvent2End = new Date(dateEvent2Start.getTime() + 5 * 60 * 60 * 1000);

  const dateEvent3Start = new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000); // En 20 días
  dateEvent3Start.setHours(19, 0, 0, 0);
  const dateEvent3End = new Date(dateEvent3Start.getTime() + 3 * 60 * 60 * 1000);

  // 3. Crear Evento 1: Taller Práctico Microservicios
  const event1 = await prisma.event.create({
    data: {
      title: "Taller Práctico: Arquitectura de Microservicios con Docker y Kubernetes",
      slug: "taller-microservicios-docker-kubernetes",
      description:
        "Domina el diseño, contenerización y orquestación de aplicaciones backend modernas. Aprenderás patrones de desacoplamiento, multi-stage Docker builds, Services, Deployments en K8s y pipelines de integración continua.",
      syllabus: `### Módulo 1: Fundamentos de Contenerización
- Anatomía de una imagen Docker eficiente y segura.
- Multi-stage builds para entornos de producción en Node.js y Go.
- Redes, volúmenes y variables de entorno.

### Módulo 2: Orquestación con Kubernetes
- Arquitectura de Kubernetes: Control Plane, Nodes, Kubelet.
- Creación de Pods, Deployments y ReplicaSets.
- ConfigMaps y Secrets para gestión segura de credenciales.

### Módulo 3: Exposición de Servicios y Networking
- Tipos de Service: ClusterIP, NodePort, LoadBalancer e Ingress Controller.
- Simulación de caídas y Zero-Downtime rolling updates.

### Módulo 4: Hands-on Final
- Despliegue de un sistema distribuido con frontend, API y PostgreSQL.`,
      requirements:
        "Laptop con al menos 8GB de RAM, Docker Desktop instalado y funcionando, VS Code y nociones básicas de terminal Linux/Git.",
      eventType: "WORKSHOP",
      modality: "VIRTUAL",
      locationOrUrl: "Google Meet (Enlace seguro enviado al ticket del asistente)",
      startDate: dateEvent1Start,
      endDate: dateEvent1End,
      maxCapacity: 35,
      price: 0,
      currency: "BOB",
      academicHours: 6,
      status: "OPEN",
      speakerId: admin.id,
      resources: {
        create: [
          {
            title: "Repositorio GitHub del Taller",
            url: "https://github.com/ingeniero-tech/workshop-k8s-microservices",
            resourceType: "GITHUB",
          },
          {
            title: "Guía de Instalación y Prerrequisitos",
            url: "https://docs.ingeniero.tech/k8s-setup",
            resourceType: "SLIDES",
          },
        ],
      },
    },
  });

  // 4. Crear Evento 2: Masterclass Seguridad Ofensiva (De pago)
  const event2 = await prisma.event.create({
    data: {
      title: "Masterclass: Seguridad Ofensiva y Endurecimiento OWASP Top 10 en APIs Node.js",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      description:
        "Aprende a identificar, simular ataques éticos y blindar vulnerabilidades críticas en arquitecturas Backend: SQL Injection, Broken Object Level Authorization (BOLA), Rate Limiting, CORS, cabeceras seguras y saneamiento estricto.",
      syllabus: `### Sesión 1: Amenazas Críticas OWASP API Top 10
- Análisis de vectores de ataque reales en APIs REST.
- Simulación y prevención de Inyección SQL y NoSQL.

### Sesión 2: Autenticación Robusta y Autorización
- Vulnerabilidades comunes con JWT (claves débiles, algoritmos 'none').
- Cookies HttpOnly vs LocalStorage: mitigación definitiva de XSS.
- Control de acceso basado en roles (RBAC).

### Sesión 3: Endurecimiento en Producción (Hardening)
- Implementación de Rate Limiting con Redis.
- Configuración de Helmet y Content Security Policy (CSP).
- Escaneo continuo de dependencias vulnerables en CI/CD.`,
      requirements:
        "Conocimientos intermedios de desarrollo web con Node.js/Express o Next.js, Postman o Insomnia instalado.",
      eventType: "WORKSHOP",
      modality: "HYBRID",
      locationOrUrl: "Auditorio Central de Ingeniería & Transmisión en vivo para asistentes remotos",
      startDate: dateEvent2Start,
      endDate: dateEvent2End,
      maxCapacity: 50,
      price: 60.0,
      currency: "BOB",
      academicHours: 8,
      status: "OPEN",
      speakerId: admin.id,
      resources: {
        create: [
          {
            title: "Laboratorio Práctico OWASP Sandbox",
            url: "https://github.com/ingeniero-tech/owasp-api-hardening-lab",
            resourceType: "GITHUB",
          },
        ],
      },
    },
  });

  // 5. Crear Evento 3: Conferencia Agentes de IA
  const event3 = await prisma.event.create({
    data: {
      title: "Conferencia Magistral: La Revolución de los Agentes de IA en la Ingeniería de Software",
      slug: "conferencia-agentes-ia-ingenieria-software",
      description:
        "Descubre cómo la IA agéntica, los modelos de lenguaje locales y el Model Context Protocol (MCP) están redefiniendo el flujo de desarrollo, automatizando el testing y potenciando al Ingeniero de Sistemas del presente y futuro.",
      syllabus: `### Keynote 1: Del Autocompletado a Agentes Autónomos
- Evolución de Copilot a sistemas multi-agente guiados por especificación (SDD).

### Keynote 2: Model Context Protocol (MCP) y Herramientas Externas
- Cómo conectar LLMs a bases de datos relacionales, repositorios y servicios externos de forma segura.

### Keynote 3: Mesa Redonda y Preguntas
- Desafíos éticos, impacto en el mercado laboral y mejores prácticas de adopción.`,
      requirements: "Navegador web moderno y conectividad a internet.",
      eventType: "CONFERENCE",
      modality: "VIRTUAL",
      locationOrUrl: "YouTube Live Privado con sala de debate interactiva",
      startDate: dateEvent3Start,
      endDate: dateEvent3End,
      maxCapacity: 250,
      price: 0,
      currency: "BOB",
      academicHours: 4,
      status: "OPEN",
      speakerId: admin.id,
    },
  });

  // 6. Crear Asistente de Ejemplo con Ticket para Evento 1
  const sampleRegistration = await prisma.registration.create({
    data: {
      eventId: event1.id,
      attendeeName: "Carlos Mendoza Quispe",
      attendeeEmail: "carlos.mendoza@example.com",
      attendeePhone: "+591 71234567",
      attendeeOccupation: "Software Developer",
      attendeeOrganization: "Tech Innovations Bolivia",
      status: "CONFIRMED",
      ticket: {
        create: {
          ticketCode: "TCK-ENG-84920",
          qrHash: "hash-ticket-carlos-mendoza-2026-demo",
        },
      },
    },
    include: {
      ticket: true,
    },
  });

  console.log(`🎟️ Registro y Ticket de prueba generado para: ${sampleRegistration.attendeeName} (Código: ${sampleRegistration.ticket?.ticketCode})`);
  console.log("✅ Seed completado con éxito con 3 eventos y datos iniciales.");
}

main()
  .catch((e) => {
    console.error("❌ Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
