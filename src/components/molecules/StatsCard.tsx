import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: "green" | "red" | "gray";
}

export default function StatsCard({ title, value, icon, trend, trendColor = "gray" }: StatsCardProps) {
  const trendColors = {
    green: "text-green-600",
    red: "text-red-600",
    gray: "text-gray-600"
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-sm ${trendColors[trendColor]}`}>{trend}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}