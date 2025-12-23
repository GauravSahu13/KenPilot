import { NextRequest, NextResponse } from "next/server";
import { loadKnowledgeFromExcel } from "@/lib/excel-parser";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Check if file is Excel
    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      return NextResponse.json(
        { error: "Only Excel files (.xlsx, .xls) are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse and load knowledge
    await loadKnowledgeFromExcel(buffer);

    return NextResponse.json({
      message: "Knowledge base updated successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}

