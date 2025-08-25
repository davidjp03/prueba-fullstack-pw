import { requireRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/molecules/DashboardHeader";
import UsersList from "@/components/organisms/UsersList";

export default async function UsersPage() {
  const session = await requireRole(["ADMIN"]);

  if (!session) {
    redirect("/user-dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={session.user.name} 
        role={session.user.role}
        title="User Management"
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <UsersList />
        </div>
      </main>
    </div>
  );
}