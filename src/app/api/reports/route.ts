import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get financial reports
 *     description: Get financial balance and monthly data (admin only)
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Financial report data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       403:
 *         description: Admin access required
 */

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const movements = await prisma.movement.findMany({
    select: { amount: true, type: true, date: true }
  });

  const totalIncome = movements
    .filter(m => m.type === "INCOME")
    .reduce((sum, m) => sum + Number(m.amount), 0);

  const totalExpense = movements
    .filter(m => m.type === "EXPENSE")
    .reduce((sum, m) => sum + Number(m.amount), 0);

  const balance = totalIncome - totalExpense;

  const monthlyData = movements.reduce((acc, movement) => {
    const month = movement.date.toISOString().slice(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    
    if (movement.type === "INCOME") {
      acc[month].income += Number(movement.amount);
    } else {
      acc[month].expense += Number(movement.amount);
    }
    
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  return NextResponse.json({
    balance,
    totalIncome,
    totalExpense,
    monthlyData
  });
}