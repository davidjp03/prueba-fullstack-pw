"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
}

interface FormData {
  concept: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  userId: string;
}

interface CreateMovementFormProps {
  onSuccess: () => void;
}

export default function CreateMovementForm({ onSuccess }: CreateMovementFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating movement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Movement</CardTitle>
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
              <option value="">Select type</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </Select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          <div>
            <Select {...register("userId", { required: "User is required" })}>
              <option value="">Select user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Select>
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Movement"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}