/**
 * Admin Dashboard Page
 * 
 * This is the main admin interface that provides comprehensive financial management capabilities.
 * Uses role-based access control (RBAC) to ensure only admin users can access admin features.
 * 
 * Architecture: Follows atomic design principles with molecules and organisms
 * Security: Server-side role validation with automatic redirection for unauthorized users
 */

import { requireRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/molecules/DashboardHeader";
import DashboardStats from "@/components/organisms/DashboardStats";
import AdminMovements from "@/components/organisms/AdminMovements";

export default async function AdminDashboard() {
  // SECURITY: Server-side role validation - only ADMIN users can access this page
  const session = await requireRole(["ADMIN"]);

  // REDIRECT: Non-admin users are automatically redirected to user dashboard
  if (!session) {
    redirect("/user-dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER: Consistent navigation with user info and sign-out functionality */}
      <DashboardHeader 
        userName={session.user.name} 
        role={session.user.role}
        title="Admin Dashboard"
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* STATS: Financial overview with balance, income, and expense metrics */}
        <DashboardStats />
        
        {/* LAYOUT: Responsive grid - main content (2/3) + sidebar (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* MAIN CONTENT: Movement management with create/edit/delete capabilities */}
            <AdminMovements />
          </div>
          
          <div className="space-y-6">
            {/* SIDEBAR: Quick navigation to admin features */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  • Create new movements
                </div>
                <a href="/users" className="block text-sm text-blue-600 hover:text-blue-800">
                  • Manage user accounts
                </a>
                <a href="/reports" className="block text-sm text-blue-600 hover:text-blue-800">
                  • View financial reports
                </a>
                <a href="/docs" className="block text-sm text-blue-600 hover:text-blue-800">
                  • API Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
