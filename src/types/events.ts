export interface WorkshopMediaMeta {
  image: string;
  categoryLabel: string;
}

export interface PublicEventDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventType: string;
  modality: string;
  locationOrUrl: string | null;
  startDate: string;
  endDate: string | null;
  maxCapacity: number;
  price: number;
  currency: string;
  academicHours: number;
  status: string;
  speakerName: string;
  registrationsCount: number;
}

export interface PublicNavEventDTO {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  modality: string;
  academicHours: number;
  maxCapacity: number;
  registrationsCount: number;
}

export interface PublicSiteStats {
  totalEvents: number;
  totalRegistrations: number;
  totalAttended: number;
  totalCertificates: number;
  totalAcademicHours: number;
  leadSpeakerName: string;
  leadSpeakerEmail: string;
}
