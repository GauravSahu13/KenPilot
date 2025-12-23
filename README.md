# Kenmark ITan Solutions - AI Chatbot

A full-stack AI-powered chatbot for Kenmark ITan Solutions website, built with Next.js 16, TypeScript, MongoDB, and LangChain RAG.

## 🚀 Features

- **AI-Powered Chatbot**: Uses Groq API (LLaMA 3.1) with RAG (Retrieval-Augmented Generation)
- **Knowledge Base**: Supports Excel file uploads for FAQs, Services, and Company information
- **Session Management**: Persistent chat history during sessions
- **Modern UI**: Responsive design with dark mode support
- **Admin Panel**: Upload and manage knowledge base files
- **RAG Implementation**: Retrieves relevant information from knowledge base before generating responses

## 🛠️ Tech Stack

### Preferred Stack (Used)
- **Frontend**: Next.js 16.x (App Router)
- **Styling**: Tailwind CSS 4.x
- **Database**: MongoDB
- **ORM**: Prisma
- **Language**: TypeScript (TSX)
- **AI/LLM**: Groq API (LLaMA 3.1 8B Instant)
- **RAG Framework**: LangChain
- **Excel Parsing**: xlsx

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or cloud like MongoDB Atlas)
- Groq API key (free tier available at https://console.groq.com)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd kenmark-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mongodb://localhost:27017/kenmark_chatbot"
# Or for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/kenmark_chatbot"

GROQ_API_KEY="your-groq-api-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Initialize Knowledge Base

Visit `http://localhost:3000/api/init` to initialize the database with default knowledge, or upload an Excel file via the admin panel.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
kenmark-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API endpoint
│   │   ├── knowledge/     # Knowledge base upload endpoint
│   │   └── init/          # Database initialization
│   ├── admin/             # Admin panel page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   └── Chatbot.tsx        # Main chatbot component
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── rag.ts             # RAG implementation
│   ├── excel-parser.ts    # Excel file parsing
│   └── init-db.ts         # Database initialization
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static files
```

## 📊 Excel Knowledge Base Format

The chatbot accepts Excel files (.xlsx) with the following structure:

| Category | Question | Answer |
|----------|----------|--------|
| About | What is Kenmark ITan Solutions? | Kenmark ITan Solutions is a technology company... |
| Services | What services are offered? | Consulting, AI solutions, training, etc. |
| Contact | How can I contact the company? | Visit the contact page on kenmarkitan.com |

### Upload Knowledge Base

1. Navigate to `/admin`
2. Select an Excel file with the above format
3. Click "Upload Knowledge Base"
4. The chatbot will now use this information to answer questions

## 🤖 AI Model Details

- **Provider**: Groq API
- **Model**: llama-3.1-8b-instant
- **Approach**: RAG (Retrieval-Augmented Generation)
- **Temperature**: 0.7 (balanced creativity and accuracy)

### How RAG Works

1. User sends a query
2. System retrieves relevant knowledge from database based on keywords
3. Retrieved context is combined with system prompt
4. LLM generates response using the context
5. Response is returned to user

## 🎨 Features

### Chatbot Features
- ✅ Floating chat interface
- ✅ Session-based chat history
- ✅ Typing indicator
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Minimize/maximize functionality

### Admin Features
- ✅ Excel file upload
- ✅ Knowledge base management
- ✅ File format validation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set:
- `DATABASE_URL`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## 📝 API Endpoints

### POST `/api/chat`
Send a chat message and get AI response.

**Request:**
```json
{
  "message": "What services do you offer?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "response": "We offer AI Solutions & Consulting...",
  "sessionId": "session-id"
}
```

### POST `/api/knowledge/upload`
Upload Excel file to update knowledge base.

**Request:** FormData with `file` field

**Response:**
```json
{
  "message": "Knowledge base updated successfully"
}
```

## 🔒 Business Rules

- Chatbot only answers questions from the knowledge base
- If information is unavailable, responds politely: "I don't have that information yet. Please contact us at kenmarkitan.com for more details."
- No hallucination - only uses provided context
- Modular architecture for maintainability

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is created for Kenmark ITan Solutions assignment.

## 👨‍💻 Author

Built for NMIMS Intern Technical Assignment - Kenmark ITan Solutions

## 🔗 Links

- **Company Website**: https://kenmarkitan.com
- **Groq API**: https://console.groq.com
- **Next.js Docs**: https://nextjs.org/docs
- **LangChain Docs**: https://js.langchain.com

## 📞 Support

For questions or issues, please contact Kenmark ITan Solutions at kenmarkitan.com

