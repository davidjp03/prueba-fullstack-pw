import { requireRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import MovementsList from "@/components/organisms/MovementsList";

export default async function MovementsPage() {
  const session = await requireRole(["USER", "ADMIN"]);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-6">
      <MovementsList />
    </div>
  );
}