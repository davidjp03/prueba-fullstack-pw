"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/molecules/StatsCard";

interface StatsData {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/reports")
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Balance"
        value={`$${stats.balance.toFixed(2)}`}
        icon={<span className="text-blue-600">💰</span>}
        trend={stats.balance >= 0 ? "Positive balance" : "Negative balance"}
        trendColor={stats.balance >= 0 ? "green" : "red"}
      />
      <StatsCard
        title="Total Income"
        value={`$${stats.totalIncome.toFixed(2)}`}
        icon={<span className="text-green-600">📈</span>}
        trendColor="green"
      />
      <StatsCard
        title="Total Expenses"
        value={`$${stats.totalExpense.toFixed(2)}`}
        icon={<span className="text-red-600">📉</span>}
        trendColor="red"
      />
    </div>
  );
}