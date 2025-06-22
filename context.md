## Overview

This project is a full-stack, prompt-centric social media post generator platform. It supports user authentication, storage of custom prompts for different platforms, and leverages the Gemini 2.0 Flash API for AI features. The app is built with Next.js (frontend, TypeScript), Express/Node.js (backend logic, or Next.js API routes), MongoDB (database), and is designed for easy deployment on **Vercel**.

> **Design Vision**:  
> The user interface must be extremely attractive, modern, and intuitive—matching the best UI/UX examples found on Dribbble and Behance. As a social media post generator website, the design should inspire creativity and encourage engagement, with fluid layouts, beautiful typography, and visually appealing color schemes.

## Tech Stack

- **Frontend:** Next.js (TypeScript), Tailwind CSS, Flowbite-React
- **Backend:** Next.js API routes (TypeScript) or Node.js (Express, if hosted externally), Mongoose/MongoDB (Atlas)
- **AI:** Gemini 2.0 Flash API (`@google/generative-ai`)
- **Deployment:** Vercel (frontend + API routes), optional: external backend on Render/Fly.io

## Key Features

- User authentication: Sign up, login, logout (JWT or NextAuth.js)
- Home page: Lists all prompts and user content
- Prompt management: Store/manage custom prompts for multiple platforms
- **Post Scheduling:** User can schedule social media posts directly from our app for Meta (Facebook/Instagram), Twitter (X), and LinkedIn with full OAuth integration and beautiful UI
- **Social Media Publishing:** Direct publishing to Facebook, Instagram, Twitter/X, and LinkedIn with real-time status tracking
- **Connection Management:** Beautiful dashboard to connect/disconnect social media accounts
- **Scheduled Posts Dashboard:** View, manage, and cancel scheduled posts with detailed status tracking
- Responsive, accessible UI/UX with a focus on modern, highly attractive design
- Frontend fully typed with TypeScript

## Folder Structure

```
/pages       # Next.js pages (TypeScript) and API routes under /pages/api
/components  # Shared and UI components (TypeScript)
/utils       # Shared utilities (TypeScript)
/models      # Mongoose schemas (if using MongoDB)
/public      # Static assets
```

## Environment Variables (example)

- `MONGO_URI`: MongoDB connection string (use MongoDB Atlas)
- `JWT_SECRET`: JWT signing key
- `NEXT_PUBLIC_GEMINI_API_KEY`: Gemini API key

## Deployment (Vercel)

- Set all environment variables in the Vercel dashboard (for both preview and production)
- Build command: `next build`
- Output directory: `.next`
- Vercel automatically handles Next.js routing and serverless API functions
- If using an external backend (Express), deploy that separately and connect via API URL

## Gemini Integration

- See `/utils/gemini.ts` for Gemini API usage
- Requires `@google/generative-ai` package

## Conventions

- Use TypeScript for all frontend and API route code
- Use functional React components
- Use Next.js API routes for backend features (preferred for Vercel)
