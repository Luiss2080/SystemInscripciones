import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("[SEED] Iniciando seed completo de base de datos...");

  await prisma.certificate.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.eventResource.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

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

  const now = new Date();
  const makeRange = (daysOffset: number, startHour: number, durationHours: number) => {
    const start = new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    start.setUTCHours(startHour, 0, 0, 0);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
    return { start, end };
  };

  const d1 = makeRange(5, 18, 4);
  const d2 = makeRange(11, 15, 5);
  const d3 = makeRange(18, 19, 3);
  const d4 = makeRange(24, 14, 6);
  const d5 = makeRange(30, 17, 4);
  const d6 = makeRange(38, 19, 3);

  const event1 = await prisma.event.create({
    data: {
      title: "Taller Práctico: Arquitectura de Microservicios con Docker y Kubernetes",
      slug: "taller-microservicios-docker-kubernetes",
      description:
        "Domina el diseño, contenerización y orquestación de aplicaciones backend modernas con multi-stage Docker builds, Services, Deployments en K8s y pipelines CI/CD.",
      syllabus: `### Módulo 1: Fundamentos de Contenerización
- Multi-stage builds eficientes para Node.js y Go.
- Redes, volúmenes y variables seguras.

### Módulo 2: Orquestación con Kubernetes
- Control Plane, Pods, Deployments y ConfigMaps.
- Exposición con Ingress Controller y Rolling Updates.`,
      requirements: "Laptop con 8GB RAM, Docker Desktop, VS Code y terminal Linux/Git.",
      eventType: "WORKSHOP",
      modality: "VIRTUAL",
      locationOrUrl: "Google Meet (Enlace enviado al ticket digital)",
      startDate: d1.start,
      endDate: d1.end,
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

  const event2 = await prisma.event.create({
    data: {
      title: "Masterclass: Seguridad Ofensiva y Endurecimiento OWASP Top 10 en APIs Node.js",
      slug: "masterclass-seguridad-apis-nodejs-owasp",
      description:
        "Simula ataques éticos y blinda vulnerabilidades críticas en APIs modernas: SQL Injection, BOLA, JWT HttpOnly, Rate Limiting, CORS y saneamiento estricto.",
      syllabus: `### Sesión 1: Vectores OWASP API Top 10
- Prevención real de BOLA e Inyección SQL/NoSQL.

### Sesión 2: Endurecimiento en Producción
- Cookies HttpOnly, CSP, Redis Rate Limiting y auditoría CI/CD.`,
      requirements: "Conocimientos intermedios de Node.js/TypeScript y cliente API REST.",
      eventType: "WORKSHOP",
      modality: "HYBRID",
      locationOrUrl: "Auditorio Central de Ingeniería & Streaming HD",
      startDate: d2.start,
      endDate: d2.end,
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

  const event3 = await prisma.event.create({
    data: {
      title: "Conferencia Magistral: La Revolución de los Agentes de IA en Ingeniería de Software",
      slug: "conferencia-agentes-ia-ingenieria-software",
      description:
        "Descubre cómo la IA agéntica y el Model Context Protocol (MCP) conectan LLMs con PostgreSQL, repositorios y flujos de Spec-Driven Development.",
      syllabus: `### Keynote 1: Sistemas Multi-Agente y SDD
- Transición de asistentes simples a agentes autónomos verificados.

### Keynote 2: Servidores MCP en Producción
- Integración segura de herramientas, esquemas SQL y observabilidad.`,
      requirements: "Navegador web actualizado e interés en arquitectura de IA.",
      eventType: "CONFERENCE",
      modality: "VIRTUAL",
      locationOrUrl: "Transmisión Privada Interactiva",
      startDate: d3.start,
      endDate: d3.end,
      maxCapacity: 250,
      price: 0,
      currency: "BOB",
      academicHours: 4,
      status: "OPEN",
      speakerId: admin.id,
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: "Bootcamp: Clean Architecture, Domain-Driven Design y PostgreSQL 18",
      slug: "bootcamp-clean-architecture-ddd-postgresql",
      description:
        "Construye un backend desacoplado de nivel empresarial aplicando entidades de dominio, DTOs con Zod, transacciones ACID e indexación avanzada en PostgreSQL.",
      syllabus: `### Día 1: Modelado Táctico DDD & Prisma
- Agregados, casos de uso puros y puertos/adaptadores.

### Día 2: Rendimiento SQL & Consistencia
- Locks transaccionales, índices parciales y auditoría.`,
      requirements: "Experiencia previa con TypeScript y bases de datos relacionales.",
      eventType: "BOOTCAMP",
      modality: "PRESENTIAL",
      locationOrUrl: "Laboratorio B-204 • Facultad de Ingeniería de Sistemas",
      startDate: d4.start,
      endDate: d4.end,
      maxCapacity: 30,
      price: 120.0,
      currency: "BOB",
      academicHours: 12,
      status: "OPEN",
      speakerId: admin.id,
    },
  });

  const event5 = await prisma.event.create({
    data: {
      title: "Taller Avanzado: Observabilidad Cloud Native con OpenTelemetry y Grafana",
      slug: "taller-observabilidad-opentelemetry-grafana",
      description:
        "Instrumenta microservicios con métricas Prometheus, trazas distribuidas OpenTelemetry y tableros de alertas en tiempo real.",
      syllabus: `### Módulo 1: Instrumentación Distribuida
- Spans, traces y correlación de logs JSON.

### Módulo 2: Dashboards & SLOs
- Alertamiento proactivo en Grafana y análisis de latencia p99.`,
      requirements: "Conocimientos básicos de Docker Compose y HTTP APIs.",
      eventType: "WORKSHOP",
      modality: "HYBRID",
      locationOrUrl: "Auditorio Tech Lab & Transmisión en Vivo",
      startDate: d5.start,
      endDate: d5.end,
      maxCapacity: 40,
      price: 80.0,
      currency: "BOB",
      academicHours: 6,
      status: "OPEN",
      speakerId: admin.id,
    },
  });

  const event6 = await prisma.event.create({
    data: {
      title: "Conferencia Técnica: Plataformas Next.js 16 y Seguridad Zero-Trust Edge",
      slug: "conferencia-nextjs-zero-trust-edge",
      description:
        "Buenas prácticas de Server Actions seguras, renderizado híbrido de alto rendimiento y despliegue resiliente en arquitecturas modernas.",
      syllabus: `### Sesión Única
- Server Components, validación en bordes y monitoreo de latencia.`,
      requirements: "Conocimientos generales de desarrollo web React/TypeScript.",
      eventType: "CONFERENCE",
      modality: "VIRTUAL",
      locationOrUrl: "Sala Virtual DevCon Stream",
      startDate: d6.start,
      endDate: d6.end,
      maxCapacity: 180,
      price: 0,
      currency: "BOB",
      academicHours: 3,
      status: "OPEN",
      speakerId: admin.id,
    },
  });

  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

  // 14 registros reales en PostgreSQL cubriendo CONFIRMED, ATTENDED (con/sin certificado) y PENDING_PAYMENT
  const registrationsSeed = [
    {
      eventId: event1.id,
      attendeeName: "Carlos Mendoza Quispe",
      attendeeEmail: "carlos.mendoza@example.com",
      attendeePhone: "+591 71234567",
      attendeeOccupation: "Software Developer",
      attendeeOrganization: "Tech Innovations Bolivia",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84920",
      qrHash: "hash-ticket-carlos-mendoza-84920",
      createdAt: hoursAgo(22),
    },
    {
      eventId: event1.id,
      attendeeName: "Valeria Rojas Torrico",
      attendeeEmail: "valeria.rojas@cloudlabs.bo",
      attendeePhone: "+591 72481902",
      attendeeOccupation: "Site Reliability Engineer",
      attendeeOrganization: "CloudLabs Andina",
      status: "ATTENDED",
      attendedAt: hoursAgo(6),
      ticketCode: "TCK-ENG-84921",
      qrHash: "hash-ticket-valeria-rojas-84921",
      certificateCode: "CERT-2026-ENG-K8S01A",
      createdAt: hoursAgo(48),
    },
    {
      eventId: event1.id,
      attendeeName: "Diego Fernández Mamani",
      attendeeEmail: "diego.fernandez@fintech.bo",
      attendeePhone: "+591 76512034",
      attendeeOccupation: "Backend Engineer",
      attendeeOrganization: "Banca Digital Sur",
      status: "ATTENDED",
      attendedAt: hoursAgo(4),
      ticketCode: "TCK-ENG-84922",
      qrHash: "hash-ticket-diego-fernandez-84922",
      createdAt: hoursAgo(44),
    },
    {
      eventId: event1.id,
      attendeeName: "Sofía Camacho Gutiérrez",
      attendeeEmail: "sofia.camacho@uni.edu.bo",
      attendeePhone: "+591 70941283",
      attendeeOccupation: "DevOps Junior",
      attendeeOrganization: "Facultad de Sistemas",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84923",
      qrHash: "hash-ticket-sofia-camacho-84923",
      createdAt: hoursAgo(18),
    },
    {
      eventId: event2.id,
      attendeeName: "Mateo Siles Justiniano",
      attendeeEmail: "mateo.siles@secops.bo",
      attendeePhone: "+591 78114509",
      attendeeOccupation: "AppSec Analyst",
      attendeeOrganization: "CiberDefensa SA",
      status: "ATTENDED",
      attendedAt: hoursAgo(3),
      ticketCode: "TCK-ENG-84924",
      qrHash: "hash-ticket-mateo-siles-84924",
      certificateCode: "CERT-2026-ENG-SEC02B",
      payment: { amount: 60.0, status: "APPROVED" },
      createdAt: hoursAgo(36),
    },
    {
      eventId: event2.id,
      attendeeName: "Lucía Paredes Vargas",
      attendeeEmail: "lucia.paredes@apiworks.dev",
      attendeePhone: "+591 71590234",
      attendeeOccupation: "Tech Lead Node.js",
      attendeeOrganization: "APIWorks Studio",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84925",
      qrHash: "hash-ticket-lucia-paredes-84925",
      payment: { amount: 60.0, status: "APPROVED" },
      createdAt: hoursAgo(15),
    },
    {
      eventId: event2.id,
      attendeeName: "Andrés Zeballos Suárez",
      attendeeEmail: "andres.zeballos@consultora.bo",
      attendeePhone: "+591 73409812",
      attendeeOccupation: "Full Stack Developer",
      attendeeOrganization: "Nexo Digital",
      status: "PENDING_PAYMENT",
      attendedAt: null,
      ticketCode: "TCK-ENG-84926",
      qrHash: "hash-ticket-andres-zeballos-84926",
      payment: { amount: 60.0, status: "PENDING" },
      createdAt: hoursAgo(5),
    },
    {
      eventId: event3.id,
      attendeeName: "Camila Antezana Morales",
      attendeeEmail: "camila.antezana@ia-research.org",
      attendeePhone: "+591 74920115",
      attendeeOccupation: "AI Platform Engineer",
      attendeeOrganization: "Lab IA Bolivia",
      status: "ATTENDED",
      attendedAt: hoursAgo(2),
      ticketCode: "TCK-ENG-84927",
      qrHash: "hash-ticket-camila-antezana-84927",
      createdAt: hoursAgo(26),
    },
    {
      eventId: event3.id,
      attendeeName: "Gabriel Arce Chávez",
      attendeeEmail: "gabriel.arce@ingenieria.tech",
      attendeePhone: "+591 77623019",
      attendeeOccupation: "Systems Architect",
      attendeeOrganization: "CoreSystems",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84928",
      qrHash: "hash-ticket-gabriel-arce-84928",
      createdAt: hoursAgo(10),
    },
    {
      eventId: event4.id,
      attendeeName: "Natalia Salvatierra Cruz",
      attendeeEmail: "natalia.salvatierra@enterprise.bo",
      attendeePhone: "+591 75234890",
      attendeeOccupation: "Senior Software Engineer",
      attendeeOrganization: "Fintech Nacional",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84929",
      qrHash: "hash-ticket-natalia-salvatierra-84929",
      payment: { amount: 120.0, status: "APPROVED" },
      createdAt: hoursAgo(8),
    },
    {
      eventId: event4.id,
      attendeeName: "Rodrigo Paz Loayza",
      attendeeEmail: "rodrigo.paz@startup.io",
      attendeePhone: "+591 72091845",
      attendeeOccupation: "Backend Lead",
      attendeeOrganization: "AndesCloud",
      status: "PENDING_PAYMENT",
      attendedAt: null,
      ticketCode: "TCK-ENG-84930",
      qrHash: "hash-ticket-rodrigo-paz-84930",
      payment: { amount: 120.0, status: "PENDING" },
      createdAt: hoursAgo(3),
    },
    {
      eventId: event5.id,
      attendeeName: "Mariana Guzmán Ortiz",
      attendeeEmail: "mariana.guzman@observability.dev",
      attendeePhone: "+591 79812044",
      attendeeOccupation: "Platform Engineer",
      attendeeOrganization: "KubeOps Latam",
      status: "ATTENDED",
      attendedAt: hoursAgo(1),
      ticketCode: "TCK-ENG-84931",
      qrHash: "hash-ticket-mariana-guzman-84931",
      certificateCode: "CERT-2026-ENG-OTL03C",
      payment: { amount: 80.0, status: "APPROVED" },
      createdAt: hoursAgo(20),
    },
    {
      eventId: event5.id,
      attendeeName: "Jorge Quiroga Hinojosa",
      attendeeEmail: "jorge.quiroga@telecom.bo",
      attendeePhone: "+591 71190455",
      attendeeOccupation: "Network & Cloud Admin",
      attendeeOrganization: "RedTel Ingeniería",
      status: "PENDING_PAYMENT",
      attendedAt: null,
      ticketCode: "TCK-ENG-84932",
      qrHash: "hash-ticket-jorge-quiroga-84932",
      payment: { amount: 80.0, status: "PENDING" },
      createdAt: hoursAgo(1),
    },
    {
      eventId: event6.id,
      attendeeName: "Elena Céspedes Mendoza",
      attendeeEmail: "elena.cespedes@edgeweb.dev",
      attendeePhone: "+591 76340129",
      attendeeOccupation: "Frontend Architect",
      attendeeOrganization: "EdgeWeb Lab",
      status: "CONFIRMED",
      attendedAt: null,
      ticketCode: "TCK-ENG-84933",
      qrHash: "hash-ticket-elena-cespedes-84933",
      createdAt: hoursAgo(2),
    },
  ];

  for (const item of registrationsSeed) {
    await prisma.registration.create({
      data: {
        eventId: item.eventId,
        attendeeName: item.attendeeName,
        attendeeEmail: item.attendeeEmail,
        attendeePhone: item.attendeePhone,
        attendeeOccupation: item.attendeeOccupation,
        attendeeOrganization: item.attendeeOrganization,
        status: item.status,
        attendedAt: item.attendedAt,
        createdAt: item.createdAt,
        ticket: {
          create: {
            ticketCode: item.ticketCode,
            qrHash: item.qrHash,
          },
        },
        ...(item.payment
          ? {
              payment: {
                create: {
                  amount: item.payment.amount,
                  status: item.payment.status,
                  verifiedAt: item.payment.status === "APPROVED" ? item.createdAt : null,
                },
              },
            }
          : {}),
        ...(item.certificateCode
          ? {
              certificate: {
                create: {
                  certificateCode: item.certificateCode,
                },
              },
            }
          : {}),
      },
    });
  }

  console.log(
    `[OK] Seed completado con 6 eventos y ${registrationsSeed.length} inscripciones reales en PostgreSQL.`
  );
}

main()
  .catch((e) => {
    console.error("[ERROR] Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
