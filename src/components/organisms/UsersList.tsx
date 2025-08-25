"use client";

import { useState, useEffect } from "react";
import UserCard from "@/components/molecules/UserCard";
import { User } from "@/types/user";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p className="text-gray-500">No users are registered in the system.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Users</h2>
        <span className="text-sm text-gray-500">{users.length} total</span>
      </div>
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onUpdate={fetchUsers}
          />
        ))}
      </div>
    </div>
  );
}