-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "syllabus" TEXT,
    "requirements" TEXT,
    "event_type" TEXT NOT NULL DEFAULT 'WORKSHOP',
    "modality" TEXT NOT NULL DEFAULT 'VIRTUAL',
    "location_or_url" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'BOB',
    "academic_hours" INTEGER NOT NULL DEFAULT 4,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "speaker_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_resources" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL DEFAULT 'GITHUB',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "attendee_name" TEXT NOT NULL,
    "attendee_email" TEXT NOT NULL,
    "attendee_phone" TEXT NOT NULL,
    "attendee_occupation" TEXT NOT NULL,
    "attendee_organization" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "attended_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "ticket_code" TEXT NOT NULL,
    "qr_hash" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "proof_file_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "certificate_code" TEXT NOT NULL,
    "pdf_url" TEXT,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_status_idx" ON "events"("status");

-- CreateIndex
CREATE INDEX "events_start_date_idx" ON "events"("start_date");

-- CreateIndex
CREATE INDEX "registrations_attendee_email_idx" ON "registrations"("attendee_email");

-- CreateIndex
CREATE INDEX "registrations_status_idx" ON "registrations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_event_id_attendee_email_key" ON "registrations"("event_id", "attendee_email");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_registration_id_key" ON "tickets"("registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticket_code_key" ON "tickets"("ticket_code");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_qr_hash_key" ON "tickets"("qr_hash");

-- CreateIndex
CREATE INDEX "tickets_qr_hash_idx" ON "tickets"("qr_hash");

-- CreateIndex
CREATE UNIQUE INDEX "payments_registration_id_key" ON "payments"("registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_registration_id_key" ON "certificates"("registration_id");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_certificate_code_key" ON "certificates"("certificate_code");

-- CreateIndex
CREATE INDEX "certificates_certificate_code_idx" ON "certificates"("certificate_code");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_resources" ADD CONSTRAINT "event_resources_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
