"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DownloadCSVButton() {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      
      // Create CSV content
      const csvContent = [
        "Month,Income,Expense,Balance",
        ...Object.entries(data.monthlyData).map(([month, values]: [string, { income: number; expense: number }]) => 
          `${month},${values.income},${values.expense},${values.income - values.expense}`
        )
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={downloadCSV} disabled={loading} variant="outline">
      {loading ? "Generating..." : "📊 Download CSV"}
    </Button>
  );
}