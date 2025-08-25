/**
 * Financial Movements API
 * 
 * This API handles CRUD operations for financial movements (income/expense transactions).
 * Implements role-based access control with different permissions for different operations.
 * 
 * Security Model:
 * - GET: All authenticated users can view movements
 * - POST: Only ADMIN users can create movements
 * - PUT/DELETE: Only ADMIN users can modify movements
 * 
 * Data Model:
 * - Movement: { concept, amount, type (INCOME/EXPENSE), date, user }
 * - Includes user relationship for displaying who created each movement
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/movements:
 *   get:
 *     summary: Get all movements
 *     description: Retrieve all financial movements (accessible to all authenticated users)
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: List of movements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new movement
 *     description: Create a new financial movement (admin only)
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - concept
 *               - amount
 *               - type
 *               - userId
 *             properties:
 *               concept:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
 *       403:
 *         description: Admin access required
 */

/**
 * GET /api/movements
 * Retrieves all financial movements with user information
 * 
 * Access: All authenticated users (ADMIN + USER)
 * Returns: Array of movements ordered by date (newest first)
 */
export async function GET(request: NextRequest) {
  // AUTHENTICATION: Verify user is logged in
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // DATABASE QUERY: Fetch all movements with user names, ordered by date
  const movements = await prisma.movement.findMany({
    include: { user: { select: { name: true } } }, // Include user name for display
    orderBy: { date: "desc" } // Newest movements first
  });

  return NextResponse.json(movements);
}

/**
 * POST /api/movements
 * Creates a new financial movement
 * 
 * Access: ADMIN users only
 * Body: { concept, amount, type, userId }
 * Returns: Created movement with user information
 */
export async function POST(request: NextRequest) {
  // AUTHORIZATION: Verify user is admin
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  // PARSE REQUEST: Extract movement data from request body
  const { concept, amount, type, userId } = await request.json();

  // DATABASE OPERATION: Create new movement with user relationship
  const movement = await prisma.movement.create({
    data: { concept, amount, type, userId },
    include: { user: { select: { name: true } } } // Return with user name
  });

  return NextResponse.json(movement);
}