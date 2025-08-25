"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Movement } from "@/types/movement";

interface User {
  id: string;
  name: string;
}

interface FormData {
  concept: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

interface EditMovementFormProps {
  movement: Movement;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditMovementForm({ movement, onSuccess, onCancel }: EditMovementFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      concept: movement.concept,
      amount: Number(movement.amount),
      type: movement.type,
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/movements/${movement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating movement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Concept"
              {...register("concept", { required: "Concept is required" })}
            />
            {errors.concept && <p className="text-red-500 text-sm">{errors.concept.message}</p>}
          </div>

          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              {...register("amount", { required: "Amount is required", min: 0.01 })}
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          <div>
            <Select {...register("type", { required: "Type is required" })}>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </Select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Updating..." : "Update Movement"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}