# Social Media Scheduling - Environment Variables Setup

To enable social media posting and scheduling, you need to set up API credentials for each platform. Add these environment variables to your `.env.local` file:

## Required Environment Variables

### Twitter/X API

```
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
```

### Facebook/Instagram API (Meta Business)

```
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### LinkedIn API

```
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

### Application Settings

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
JWT_SECRET=your_jwt_secret
```

## Platform Setup Instructions

### 1. Twitter/X Developer Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app or use existing app
3. Generate API Keys and Access Tokens
4. Set up OAuth 2.0 with PKCE
5. Add redirect URL: `http://localhost:3000/api/auth/callback/twitter`

### 2. Facebook/Instagram Business Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use existing app
3. Add Facebook Login and Instagram Basic Display products
4. Generate App ID and App Secret
5. Set up OAuth redirect URL: `http://localhost:3000/api/auth/callback/facebook`
6. Request permissions: `pages_manage_posts`, `instagram_basic`, `instagram_content_publish`

### 3. LinkedIn Developer Setup

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app
3. Add Sign In with LinkedIn and Share on LinkedIn products
4. Generate Client ID and Client Secret
5. Set up OAuth redirect URL: `http://localhost:3000/api/auth/callback/linkedin`
6. Request permissions: `r_liteprofile`, `r_emailaddress`, `w_member_social`

## OAuth Flow Implementation

The application uses OAuth 2.0 for secure authentication with social media platforms. Here's how it works:

1. **Connection Request**: User clicks "Connect" button for a platform
2. **OAuth Redirect**: User is redirected to platform's OAuth authorization page
3. **User Authorization**: User grants permissions to the application
4. **Callback Handling**: Platform redirects back with authorization code
5. **Token Exchange**: Application exchanges code for access tokens
6. **Store Credentials**: Encrypted tokens are stored in database

## Security Considerations

- All access tokens are encrypted before storage
- Refresh tokens are used to maintain long-term access
- Token expiration is tracked and handled automatically
- User can revoke access at any time from the dashboard

## Rate Limiting

Each platform has different rate limits:

- **Twitter**: 300 requests per 15-minute window
- **Facebook**: 200 calls per hour per user
- **Instagram**: 240 requests per hour
- **LinkedIn**: 100,000 calls per day

The scheduling service automatically handles rate limiting and retries failed requests.

## Testing

For development and testing:

1. Use sandbox/test environments when available
2. Create test social media accounts
3. Use webhook testing tools like ngrok for local development
4. Monitor API usage in platform developer dashboards

## Production Deployment

When deploying to production:

1. Update all redirect URLs to production domain
2. Request production access from platforms (if required)
3. Set up proper monitoring and logging
4. Implement backup strategies for failed posts
5. Set up alerts for API quota limits
