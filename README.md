# SocialGen: AI Social Media Post Generator

SocialGen is a full-stack SaaS application that generates optimized social media posts for various platforms using Google's Gemini 2.0 Flash AI. The application allows users to specify platforms, topics, target audiences, and tones to create highly engaging content with minimal effort.

## Key Features

- **AI-Powered Post Generation**: Creates platform-specific content optimized for different social networks
- **Custom Prompt Management**: Save and reuse your favorite prompt templates
- **User Authentication**: Secure signup, login, and user management
- **Cross-Platform Support**: Generate content for Instagram, LinkedIn, Twitter, Facebook, and more
- **Modern UI/UX**: Clean, responsive design built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS v4
- **Backend**: Express/Node.js, MongoDB (with Mongoose)
- **AI**: Google Gemini 2.0 Flash API
- **Authentication**: JWT-based auth
- **Deployment**: Render.com compatible

## Project Structure

```
/api           # Express backend
/models        # Mongoose schemas
/context       # React context providers
/components    # UI components and layout elements
/utils         # Utility functions
/public        # Static assets
/app           # Next.js app router pages and routes
  /dashboard   # User dashboard for managing saved posts and prompts
  /generator   # Post generation interface
  /login       # User login page
  /register    # User registration page
  /pricing     # Subscription plans and pricing
  /privacy     # Privacy policy
  /terms       # Terms of service
  /contact     # Contact form and information
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or Atlas)
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies

```bash
# Install backend and frontend dependencies
npm install
```

3. Set up environment variables

   - Copy `.env.example` to `.env`
   - Fill in your MongoDB URI, JWT secret, and Gemini API key

4. Run the development server

```bash
# Run frontend and backend concurrently
npm run dev:full

# Or run them separately
npm run dev          # Frontend
npm run dev:server   # Backend
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is designed for easy deployment on Render.com:

1. Set up a Web Service for the backend
2. Set up a Static Site for the frontend
3. Configure the environment variables
4. Connect to your MongoDB instance

## License

MIT
