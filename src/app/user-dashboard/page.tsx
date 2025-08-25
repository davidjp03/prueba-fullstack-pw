import { requireRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/molecules/DashboardHeader";
import MovementsList from "@/components/organisms/MovementsList";

export default async function UserDashboard() {
  const session = await requireRole(["USER", "ADMIN"]);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={session.user.name} 
        role={session.user.role}
        title="Dashboard"
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <MovementsList />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Account Info</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{session.user.name}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Role:</span>
                  <span className="ml-2 font-medium">{session.user.role}</span>
                </div>
              </div>
            </div>
            
            {session.user.role === "ADMIN" && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Admin Access</h4>
                <p className="text-sm text-blue-700 mb-3">
                  You have admin privileges. Access the full admin dashboard for more features.
                </p>
                <a 
                  href="/dashboard" 
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to Admin Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}