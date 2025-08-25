import { requireRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/molecules/DashboardHeader";
import DashboardStats from "@/components/organisms/DashboardStats";
import ReportsSection from "@/components/organisms/ReportsSection";

export default async function ReportsPage() {
  const session = await requireRole(["ADMIN"]);

  if (!session) {
    redirect("/user-dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={session.user.name} 
        role={session.user.role}
        title="Financial Reports"
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DashboardStats />
        <ReportsSection />
      </main>
    </div>
  );
}