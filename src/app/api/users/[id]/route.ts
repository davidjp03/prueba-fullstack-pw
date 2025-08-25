import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { name, role } = await request.json();
  const { id } = await params;

  const user = await prisma.user.update({
    where: { id },
    data: { name, role },
    select: { id: true, name: true, email: true, role: true }
  });

  return NextResponse.json(user);
}