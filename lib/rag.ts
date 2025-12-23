import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { prisma } from "./prisma";

// Initialize Groq LLM
const llm = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are an AI assistant for Kenmark ITan Solutions. Your role is to help users with information about the company, services, and FAQs.

IMPORTANT RULES:
1. Only answer questions using the provided context from the knowledge base
2. If the information is not available in the context, politely say: "I don't have that information yet. Please contact us at kenmarkitan.com for more details."
3. Be polite, concise, and professional
4. Do not make up information or hallucinate
5. If asked about something outside your knowledge base, redirect to the website

Use the following context to answer the user's question:`;

const NO_INFO =
  "I don't have that information yet. Please contact us at kenmarkitan.com for more details.";

// Retrieve relevant knowledge from database
export async function retrieveKnowledge(
  query: string,
  limit: number = 5
): Promise<{ context: string; matched: boolean }> {
  try {
    // Simple keyword-based retrieval (can be enhanced with vector search)
    const keywords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    
    const knowledgeEntries = await prisma.knowledgeBase.findMany({
      take: limit * 2, // Get more entries for better matching
    });

    // Score and rank entries based on keyword matching
    const scoredEntries = knowledgeEntries.map(entry => {
      const entryText = `${entry.question || ""} ${entry.answer} ${entry.category}`.toLowerCase();
      const score = keywords.reduce((acc, keyword) => {
        return acc + (entryText.includes(keyword) ? 1 : 0);
      }, 0);
      return { ...entry, score };
    });

    // Sort by score and take top results
    const topEntries = scoredEntries
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .filter(entry => entry.score > 0);

    if (topEntries.length === 0) {
      return { context: "", matched: false };
    }

    // Format context
    const context = topEntries
      .map(entry => {
        const category = entry.category;
        const question = entry.question ? `Q: ${entry.question}\n` : "";
        return `[${category}] ${question}A: ${entry.answer}`;
      })
      .join("\n\n");

    return { context, matched: true };
  } catch (error) {
    console.error("Error retrieving knowledge:", error);
    return { context: "", matched: false };
  }
}

// Generate response using RAG
export async function generateResponse(
  query: string,
  chatHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    // Retrieve relevant knowledge
    const { context, matched } = await retrieveKnowledge(query);

    if (!matched || !context.trim()) {
      return NO_INFO;
    }

    // Build prompt with context
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT + "\n\nContext:\n{context}"],
      ...chatHistory.map(msg => [msg.role === "user" ? "human" : "assistant", msg.content]),
      ["human", "{query}"],
    ]);

    // Create chain
    const chain = RunnableSequence.from([
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    // Generate response
    const response = await chain.invoke({
      context,
      query,
      chatHistory: chatHistory.map(msg => msg.content).join("\n"),
    });

    return response.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact us at kenmarkitan.com.";
  }
}

// Initialize knowledge base with default content
export async function initializeKnowledgeBase(): Promise<void> {
  const defaultKnowledge = [
    {
      category: "About",
      question: "What is Kenmark ITan Solutions?",
      answer: "Kenmark ITan Solutions is a technology company focused on delivering innovative solutions in AI, consulting, training, and digital transformation. We help businesses leverage cutting-edge technology to achieve their goals.",
    },
    {
      category: "About",
      question: "What is Kenmark ITan Solutions tagline?",
      answer: "Learn. Create. Impress. Kenmark ITan Solutions is a one-stop shop for IT solutions including hosting, development, design, branding, marketing, and consultancy.",
    },
    {
      category: "Services",
      question: "What services are offered?",
      answer: "We offer AI Solutions & Consulting, Technology Training & Workshops, Digital Transformation Services, Custom Software Development, and Cloud Solutions & Migration.",
    },
    {
      category: "Services",
      question: "Do you provide hosting?",
      answer: "Yes. We provide shared hosting, VPS, and dedicated servers with 24x7 support and reliable uptime.",
    },
    {
      category: "Services",
      question: "Do you offer design and branding?",
      answer: "Yes. We provide UI/UX design, graphics, landing pages, brand identity, and integrated marketing support.",
    },
    {
      category: "Services",
      question: "Do you offer consultancy and marketing?",
      answer: "Yes. We provide consultancy for technical strategy, SEO, SMM, integrated campaigns, and technical advisory.",
    },
    {
      category: "Services",
      question: "What toolkits do you use?",
      answer: "We work with Node.js, Express, Bootstrap, MySQL, Flutter, Angular, Next.js, React.js, Tailwind CSS, MongoDB, WordPress, and Figma.",
    },
    {
      category: "Contact",
      question: "How can I contact the company?",
      answer: "You can visit our website at kenmarkitan.com or use the contact page for more information.",
    },
    {
      category: "Website",
      question: "What is the company website?",
      answer: "The official website is https://kenmarkitan.com where you can find more information about our services and contact details.",
    },
  ];

  for (const knowledge of defaultKnowledge) {
    // Check if entry already exists
    const existing = await prisma.knowledgeBase.findFirst({
      where: {
        category: knowledge.category,
        question: knowledge.question,
      },
    });

    if (!existing) {
      await prisma.knowledgeBase.create({
        data: {
          category: knowledge.category,
          question: knowledge.question,
          answer: knowledge.answer,
          metadata: JSON.stringify({ source: "default" }),
        },
      });
    }
  }
}

