import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const movements = await prisma.movement.findMany({
    include: { user: { select: { name: true } } },
    orderBy: { date: "desc" }
  });

  return NextResponse.json(movements);
}