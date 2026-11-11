export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  ticketCode?: string;
  registrationId?: string;
}

export interface CheckinActionResult {
  success: boolean;
  alreadyAttended?: boolean;
  message: string;
  attendeeName?: string;
  eventTitle?: string;
  attendedAt?: Date | string | null;
  ticketCode?: string;
}

export interface CertificateIssueResult {
  success: boolean;
  message: string;
  certificateCode?: string;
}

export interface CreateEventResult {
  success: boolean;
  message?: string;
  eventSlug?: string;
}

