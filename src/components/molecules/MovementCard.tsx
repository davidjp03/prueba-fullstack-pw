/**
 * MovementCard Component (Molecule)
 * 
 * Displays individual financial movement information with role-based actions.
 * Follows atomic design principles - combines atoms (Badge, Button) with UI cards.
 * 
 * Features:
 * - Read-only view for all users
 * - Edit/Delete actions for admin users only
 * - Inline editing with form replacement
 * - Optimistic UI updates
 * - Proper error handling and loading states
 * 
 * Architecture:
 * - Molecule level component (combines atoms)
 * - Client-side interactivity with server actions
 * - Role-based conditional rendering
 */

"use client";

import { useState } from "react";
import Badge from "@/components/atoms/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditMovementForm from "@/components/molecules/EditMovementForm";
import { useSession } from "@/hooks/useSession";
import { Movement } from "@/types/movement";

interface MovementCardProps {
  movement: Movement;
  onUpdate?: () => void; // Callback to refresh parent list after changes
}

export default function MovementCard({ movement, onUpdate }: MovementCardProps) {
  // STATE MANAGEMENT: Track editing and loading states
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // AUTHENTICATION: Get current user session for role checking
  const { data: session } = useSession();
  
  // DATA FORMATTING: Format display values
  const formattedDate = new Date(movement.date).toLocaleDateString();
  const formattedAmount = `$${Number(movement.amount).toFixed(2)}`;
  
  // AUTHORIZATION: Check if current user is admin
  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  /**
   * Handles movement deletion with confirmation
   * Only available to admin users
   */
  const handleDelete = async () => {
    // USER CONFIRMATION: Prevent accidental deletions
    if (!confirm("Are you sure you want to delete this movement?")) return;
    
    setIsDeleting(true);
    try {
      // API CALL: Delete movement via REST API
      const response = await fetch(`/api/movements/${movement.id}`, {
        method: "DELETE",
      });
      
      // SUCCESS: Refresh parent list to show updated data
      if (response.ok && onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error deleting movement:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handles successful edit completion
   * Exits edit mode and refreshes data
   */
  const handleEditSuccess = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate();
  };

  // CONDITIONAL RENDERING: Show edit form when in editing mode
  if (isEditing) {
    return (
      <EditMovementForm
        movement={movement}
        onSuccess={handleEditSuccess}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  // MAIN RENDER: Display movement information with conditional admin actions
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{movement.concept}</CardTitle>
          <div className="flex items-center space-x-2">
            {/* ATOM: Badge component for movement type */}
            <Badge type={movement.type} />
            
            {/* ROLE-BASED UI: Admin-only edit/delete buttons */}
            {isAdmin && (
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "..." : "Delete"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* MOVEMENT DETAILS: Formatted display of all movement information */}
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Amount: <span className="font-medium text-foreground">{formattedAmount}</span></p>
          <p>User: <span className="font-medium text-foreground">{movement.user.name}</span></p>
          <p>Date: <span className="font-medium text-foreground">{formattedDate}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}