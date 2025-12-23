import * as XLSX from "xlsx";
import { prisma } from "./prisma";

export interface ExcelRow {
  Category: string;
  Question?: string;
  Answer: string;
}

export async function parseExcelFile(filePath: string): Promise<void> {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

    // Process and store in database
    for (const row of data) {
      if (row.Answer) {
        // Check if entry already exists
        const existing = await prisma.knowledgeBase.findFirst({
          where: {
            category: row.Category || "General",
            question: row.Question || null,
          },
        });

        if (existing) {
          await prisma.knowledgeBase.update({
            where: { id: existing.id },
            data: {
              answer: row.Answer,
              updatedAt: new Date(),
            },
          });
        } else {
          await prisma.knowledgeBase.create({
            data: {
              category: row.Category || "General",
              question: row.Question || null,
              answer: row.Answer,
              metadata: JSON.stringify({ source: "excel" }),
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw error;
  }
}

export async function parseExcelBuffer(buffer: Buffer): Promise<ExcelRow[]> {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    console.error("Error parsing Excel buffer:", error);
    throw error;
  }
}

export async function loadKnowledgeFromExcel(buffer: Buffer): Promise<void> {
  const data = await parseExcelBuffer(buffer);
  
  for (const row of data) {
    if (row.Answer) {
      // Check if entry already exists (by question and category)
      const existing = await prisma.knowledgeBase.findFirst({
        where: {
          category: row.Category || "General",
          question: row.Question || null,
        },
      });

      if (existing) {
        // Update existing entry
        await prisma.knowledgeBase.update({
          where: { id: existing.id },
          data: {
            answer: row.Answer,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new entry
        await prisma.knowledgeBase.create({
          data: {
            category: row.Category || "General",
            question: row.Question || null,
            answer: row.Answer,
            metadata: JSON.stringify({ source: "excel" }),
          },
        });
      }
    }
  }
}

