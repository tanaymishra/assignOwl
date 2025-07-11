# Google OAuth Setup Guide

## Overview
The application now uses Google Identity Services with a simple credential-based flow that sends the Google credential token directly to your backend endpoint at `/auth/google`.

## How It Works

1. **Frontend**: Uses Google Identity Services to get a credential token
2. **Backend**: Receives the credential token at `POST /auth/google`
3. **Authentication**: Backend validates the token with Google and creates/authenticates the user

## Required Setup

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select your project
3. Enable the Google+ API (if not already enabled)
4. Go to "APIs & Services" → "Credentials"
5. Create an OAuth 2.0 Client ID (Web application)
6. Add your domain to "Authorized JavaScript origins":
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

### 2. Environment Variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.googleusercontent.com
```

### 3. Backend Requirements
Your backend should handle `POST /auth/google` with:
```json
{
  "credential": "google-jwt-credential-token"
}
```

The backend should:
1. Verify the JWT credential with Google
2. Extract user information (email, name, etc.)
3. Create or authenticate the user
4. Set httpOnly cookies for session management
5. Return user data:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "message": "Authentication successful"
}
```

## Frontend Implementation

### Google Sign-In Methods
The implementation provides two methods:

1. **One Tap Prompt**: Automatic prompt when `handleGoogleLogin()` is called
2. **Sign-In Button**: Manual button that can be rendered using `renderGoogleButton()`

### Usage in Components
```typescript
import { handleGoogleLogin } from './functions/authService'

// For automatic One Tap prompt
const result = await handleGoogleLogin()

// For rendering a button
import { renderGoogleButton } from './functions/authService'
const buttonElement = document.getElementById('google-signin-button')
renderGoogleButton(buttonElement)
```

## Security Notes

- The Google Client Secret should ONLY be on your backend
- Never expose the Client Secret in frontend code
- The frontend only needs the Client ID
- All authentication logic should remain on the backend
- Use httpOnly cookies for session management

## Testing

1. Make sure Google Identity Services script is loaded
2. Ensure environment variables are set
3. Test the One Tap prompt functionality
4. Verify the backend receives and processes the credential correctly
5. Check that the auth store is updated after successful authentication

## Troubleshooting

- **"Google Identity Services not loaded"**: Check if the script is loaded in layout.tsx
- **"Google Client ID not configured"**: Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local
- **One Tap not showing**: This is normal behavior; Google controls when to show it
- **Authentication fails**: Check backend logs and Google credential validation
