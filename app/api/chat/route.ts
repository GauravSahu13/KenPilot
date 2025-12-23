import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/lib/rag";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get or create session
    let session = await prisma.chatSession.findUnique({
      where: { sessionId: sessionId || "" },
      include: { messages: { orderBy: { createdAt: "asc" }, take: 20 } },
    });

    if (!session && sessionId) {
      session = await prisma.chatSession.create({
        data: { sessionId },
      });
    } else if (!session) {
      const newSessionId = uuidv4();
      session = await prisma.chatSession.create({
        data: { sessionId: newSessionId },
      });
    }

    // Get chat history (already included if session existed)
    const chatHistory =
      session?.messages ??
      (await prisma.chatMessage.findMany({
        where: { sessionId: session.sessionId },
        orderBy: { createdAt: "asc" },
        take: 20,
      }));

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.sessionId,
        role: "user",
        content: message,
      },
    });

    // Format chat history for LLM
    const formattedHistory = chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Generate response
    const response = await generateResponse(message, formattedHistory);

    // Save assistant response
    const assistantMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.sessionId,
        role: "assistant",
        content: response,
      },
    });

    return NextResponse.json({
      response,
      sessionId: session.sessionId,
      history: [...chatHistory, assistantMessage].map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

