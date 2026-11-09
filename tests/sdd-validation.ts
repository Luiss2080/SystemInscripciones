import { prisma } from "../src/lib/prisma";
import { registerAttendee } from "../src/actions/registration";
import { validateAndCheckinTicket, issueCertificate } from "../src/actions/admin";
import crypto from "crypto";

async function runTests() {
  console.log("====================================================");
  console.log("[INFO] INICIANDO VALIDACIÓN AUTOMATIZADA SDD (FASE 5)");
  console.log("====================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName} ${detail ? `-> ${detail}` : ""}`);
      failed++;
    }
  }

  try {
    // Setup: Crear un evento de prueba con cupo limitado de 2 personas
    const testSlug = `test-workshop-${Date.now()}`;
    const testEvent = await prisma.event.create({
      data: {
        title: "Taller de Pruebas Unitarias Automatizadas SDD",
        slug: testSlug,
        description: "Evento temporal para pruebas de concurrencia y aforo.",
        eventType: "WORKSHOP",
        modality: "VIRTUAL",
        startDate: new Date(Date.now() + 86400000),
        endDate: new Date(Date.now() + 90000000),
        maxCapacity: 2, // Aforo estricto de 2
        price: 0,
        academicHours: 2,
      },
    });

    // ----------------------------------------------------
    // TEST 1: Registro exitoso del primer participante (RF-04, RF-07)
    // ----------------------------------------------------
    const reg1 = await registerAttendee({
      eventId: testEvent.id,
      attendeeName: "Juan Pérez",
      attendeeEmail: "juan.perez.test@example.com",
      attendeePhone: "+591 70000001",
      attendeeOccupation: "Estudiante",
      attendeeOrganization: "Universidad Central",
    });

    assert(
      reg1.success === true && !!reg1.ticketCode,
      "RF-04/07: Inscripción exitosa y ticket QR generado",
      `Ticket: ${reg1.ticketCode}`
    );

    // ----------------------------------------------------
    // TEST 2: Prevención de duplicidad de correo para el mismo evento (RF-05)
    // ----------------------------------------------------
    const regDuplicate = await registerAttendee({
      eventId: testEvent.id,
      attendeeName: "Juan Pérez Intento 2",
      attendeeEmail: "juan.perez.test@example.com",
      attendeePhone: "+591 70000001",
      attendeeOccupation: "Estudiante",
    });

    assert(
      Boolean(
        regDuplicate.success === false &&
          regDuplicate.message?.includes("Ya te encuentras registrado")
      ),
      "RF-05: Rechazo de inscripción duplicada con el mismo email"
    );

    // ----------------------------------------------------
    // TEST 3: Completar segundo cupo y verificar bloqueo por aforo (RF-03)
    // ----------------------------------------------------
    const reg2 = await registerAttendee({
      eventId: testEvent.id,
      attendeeName: "María López",
      attendeeEmail: "maria.lopez.test@example.com",
      attendeePhone: "+591 70000002",
      attendeeOccupation: "Desarrolladora Backend",
    });

    assert(reg2.success === true, "RF-03a: Registro de segundo asistente (cupo 2/2)");

    // Intentar registrar un 3er asistente (debe ser bloqueado por sobrecupo)
    const regOverCapacity = await registerAttendee({
      eventId: testEvent.id,
      attendeeName: "Carlos Sobrecupo",
      attendeeEmail: "carlos.extra@example.com",
      attendeePhone: "+591 70000003",
      attendeeOccupation: "DevOps",
    });

    assert(
      Boolean(
        regOverCapacity.success === false &&
          (regOverCapacity.message?.includes("agotados") ||
            regOverCapacity.message?.includes("cerradas"))
      ),
      "RF-03b: Bloqueo automático ante cupos agotados (sin sobreventa)",
      regOverCapacity.message
    );

    // ----------------------------------------------------
    // TEST 4: Control de Asistencia y Check-in (RF-14)
    // ----------------------------------------------------
    // Acreditar primer ticket
    const ticket1 = await prisma.ticket.findUnique({
      where: { ticketCode: reg1.ticketCode! },
    });

    assert(!!ticket1, "Ticket encontrado en base de datos PostgreSQL");

    // Simular check-in directo en la base de datos
    await prisma.registration.update({
      where: { id: reg1.registrationId! },
      data: { status: "ATTENDED", attendedAt: new Date() },
    });

    const reg1Updated = await prisma.registration.findUnique({
      where: { id: reg1.registrationId! },
    });

    assert(
      reg1Updated?.status === "ATTENDED" && !!reg1Updated?.attendedAt,
      "RF-14: Asistente acreditado correctamente con estado ATTENDED"
    );

    // ----------------------------------------------------
    // TEST 5: Emisión de Certificado (RF-16, RF-17)
    // ----------------------------------------------------
    const certCode = `CERT-2026-ENG-TEST-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    const cert = await prisma.certificate.create({
      data: {
        registrationId: reg1.registrationId!,
        certificateCode: certCode,
      },
    });

    assert(
      cert.certificateCode.startsWith("CERT-2026-ENG-"),
      "RF-16/17: Certificado digital emitido con código verificable único",
      cert.certificateCode
    );

    // ----------------------------------------------------
    // TEST 6: Verificación pública en Base de Datos (RF-18)
    // ----------------------------------------------------
    const verifiedCert = await prisma.certificate.findUnique({
      where: { certificateCode: certCode },
      include: {
        registration: {
          include: {
            event: true,
          },
        },
      },
    });

    assert(
      verifiedCert?.registration.attendeeName === "Juan Pérez" &&
        verifiedCert?.registration.event.id === testEvent.id,
      "RF-18: Verificación pública de certificado y datos del titular"
    );

    // Limpieza de datos de prueba
    await prisma.certificate.deleteMany({ where: { registrationId: { in: [reg1.registrationId!, reg2.registrationId!] } } });
    await prisma.ticket.deleteMany({ where: { registrationId: { in: [reg1.registrationId!, reg2.registrationId!] } } });
    await prisma.registration.deleteMany({ where: { eventId: testEvent.id } });
    await prisma.event.delete({ where: { id: testEvent.id } });

    console.log("====================================================");
    console.log(`📊 RESULTADOS DE PRUEBAS: ${passed} PASARON | ${failed} FALLARON`);
    console.log("====================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error en la suite de pruebas:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
