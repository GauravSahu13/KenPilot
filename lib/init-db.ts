import { initializeKnowledgeBase } from "./rag";

// Initialize database with default knowledge
export async function initDatabase() {
  try {
    await initializeKnowledgeBase();
    console.log("Database initialized with default knowledge");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

