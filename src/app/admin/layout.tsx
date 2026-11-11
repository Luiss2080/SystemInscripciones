import { getAdminSession } from "@/lib/auth/jwt";
import { AdminLayoutClient } from "@/components/admin/layout/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  const adminShortName = session?.fullName?.split(" - ")[0]?.trim() || "Administrador";

  return (
    <AdminLayoutClient adminName={adminShortName} adminEmail={session?.email}>
      {children}
    </AdminLayoutClient>
  );
}
