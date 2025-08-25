"use client";

import FinancialChart from "@/components/molecules/FinancialChart";
import DownloadCSVButton from "@/components/molecules/DownloadCSVButton";

export default function ReportsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Financial Reports</h2>
        <DownloadCSVButton />
      </div>
      
      <FinancialChart />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Report Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-gray-600">Data Source</p>
            <p className="font-medium">All Movements</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-gray-600">Period</p>
            <p className="font-medium">All Time</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-gray-600">Export Format</p>
            <p className="font-medium">CSV</p>
          </div>
        </div>
      </div>
    </div>
  );
}