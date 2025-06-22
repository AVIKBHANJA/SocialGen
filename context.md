# Project Context: Avik's Blog Full Stack Migration

## Overview
This project is a full-stack, prompt-centric social media post generator platform. It supports user authentication, storage of custom prompts for different platforms, and leverages the Gemini 2.0 Flash API for AI features. The app is built with Next.js (frontend), Express/Node.js (backend), MongoDB (database), and TypeScript across frontend. Designed for easy deployment on Render.com.

## Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS, Flowbite-React
- **Backend:** Node.js (Express), Mongoose/MongoDB
- **AI:** Gemini 2.0 Flash API (`@google/generative-ai`)
- **Deployment:** Render.com (free tier compatible)

## Key Features
- User authentication: Sign up, login, logout (JWT or NextAuth.js)
- Home page: Lists all prompts and user content
- Prompt management: Store/manage custom prompts for multiple platforms
- Responsive, accessible UI/UX with a focus on modern design
- Backend and frontend fully typed with TypeScript

## Folder Structure
```
/api         # Express backend 
/models      # Mongoose schemas 
/pages       # Next.js pages (TypeScript)
/components  # Shared and UI components (TypeScript)
/utils       # Shared utilities (TypeScript)
/public      # Static assets
```

## Environment Variables (example)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing key
- `NEXT_PUBLIC_GEMINI_API_KEY`: Gemini API key

## Deployment (Render)
- Set all env vars in Render dashboard
- Start command: `npm run build && npm start` (or use `Procfile`)
- Ensure ports are set correctly (default: 3000)

## Gemini Integration
- See `/utils/gemini.ts` for Gemini API usage
- Requires `@google/generative-ai` package

## Conventions
- Use TypeScript for only frontend code
- Use functional React components
- Prefer Next.js API routes for new backend features unless deep DB logic is needed

---

This context file should be updated with every major architectural change.