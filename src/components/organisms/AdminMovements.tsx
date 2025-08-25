"use client";

import { useState } from "react";
import MovementsList from "./MovementsList";
import CreateMovementForm from "@/components/molecules/CreateMovementForm";

export default function AdminMovements() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMovementCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <CreateMovementForm onSuccess={handleMovementCreated} />
      <MovementsList key={refreshKey} />
    </div>
  );
}