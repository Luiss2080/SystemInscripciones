"use server";

import { registerAttendeeService } from "@/services/registration/registration.service";
import type { ActionResponse } from "@/types/actions";

export async function registerAttendee(formData: unknown): Promise<ActionResponse> {
  return registerAttendeeService(formData);
}
