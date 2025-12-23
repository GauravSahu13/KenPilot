import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const limit = Number(searchParams.get("limit") || 20);

    if (sessionId) {
      const session = await prisma.chatSession.findUnique({
        where: { sessionId },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }

      return NextResponse.json({
        sessionId: session.sessionId,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        messages: session.messages.map((m) => ({
          role: m.role,
          content: m.content,
          createdAt: m.createdAt,
        })),
      });
    }

    const sessions = await prisma.chatSession.findMany({
      orderBy: { updatedAt: "desc" },
      take: Math.min(limit, 100),
      include: {
        _count: { select: { messages: true } },
      },
    });

    return NextResponse.json(
      sessions.map((s) => ({
        sessionId: s.sessionId,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        messageCount: s._count.messages,
      }))
    );
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

