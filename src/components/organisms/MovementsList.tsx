"use client";

import { useState, useEffect } from "react";
import MovementCard from "@/components/molecules/MovementCard";
import { Movement } from "@/types/movement";

export default function MovementsList() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movements")
      .then(res => res.json())
      .then(data => {
        setMovements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Recent Movements</h2>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (movements.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No movements yet</h3>
        <p className="text-gray-500">Start by creating your first financial movement.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Movements</h2>
        <span className="text-sm text-gray-500">{movements.length} total</span>
      </div>
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {movements.map(movement => (
          <MovementCard 
            key={movement.id} 
            movement={movement} 
            onUpdate={() => {
              fetch("/api/movements")
                .then(res => res.json())
                .then(setMovements)
                .catch(console.error);
            }}
          />
        ))}
      </div>
    </div>
  );
}