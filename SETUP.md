# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `env.example` to `.env` and fill in your values:
```bash
cp env.example .env
```

Edit `.env` and add:
- `DATABASE_URL`: Your MongoDB connection string
- `GROQ_API_KEY`: Get a free API key from https://console.groq.com

### 3. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Initialize Knowledge Base
Visit `http://localhost:3000/api/init` in your browser to initialize default knowledge, or upload an Excel file via `/admin`.

### 5. Run Development Server
```bash
npm run dev
```

## Getting Groq API Key

1. Go to https://console.groq.com
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

## MongoDB Setup

### Option 1: Local MongoDB
Install MongoDB locally and use:
```
DATABASE_URL="mongodb://localhost:27017/kenmark_chatbot"
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password
5. Use the connection string in `.env`

## Troubleshooting

### Prisma Issues
If you encounter Prisma errors:
```bash
npx prisma generate
npx prisma db push --force-reset  # WARNING: This deletes all data
```

### Groq API Errors
- Verify your API key is correct
- Check if you've exceeded rate limits (free tier has limits)
- Ensure the API key is in your `.env` file

### Database Connection Issues
- Verify MongoDB is running (if local)
- Check your connection string format
- Ensure network access is allowed (for Atlas)

