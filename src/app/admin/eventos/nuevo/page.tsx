import { getAdminSession } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import { NewEventForm } from "@/components/admin/events/NewEventForm";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <NewEventForm />;
}
