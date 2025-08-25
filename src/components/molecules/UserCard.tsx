"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EditUserForm from "@/components/molecules/EditUserForm";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
  onUpdate?: () => void;
}

export default function UserCard({ user, onUpdate }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  const handleEditSuccess = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate();
  };

  if (isEditing) {
    return (
      <EditUserForm
        user={user}
        onSuccess={handleEditSuccess}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{user.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Email: <span className="font-medium text-foreground">{user.email}</span></p>
          <p>Joined: <span className="font-medium text-foreground">{formattedDate}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}