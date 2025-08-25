import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
  role: string;
  title: string;
}

export default function DashboardHeader({ userName, role, title }: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">Welcome back, {userName}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
              {role}
            </span>
          </div>
          <form action="/api/auth/sign-out" method="POST">
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}