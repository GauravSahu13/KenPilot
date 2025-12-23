import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Returns most asked questions (user messages) by frequency
export async function GET() {
  try {
    const pipeline = [
      { $match: { role: "user" } },
      { $group: { _id: "$content", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ];

    // Using aggregateRaw for MongoDB via Prisma
    const result = (await prisma.chatMessage.aggregateRaw({
      pipeline,
    })) as unknown as Array<{ _id: string; count: number }>;

    const mostAsked = result.map((r) => ({
      question: r._id,
      count: r.count,
    }));

    return NextResponse.json({ mostAsked });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}

