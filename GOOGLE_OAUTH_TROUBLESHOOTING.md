# Google OAuth Troubleshooting Guide

## Current Implementation
The app now uses Google Identity Services with a simple credential flow that sends the JWT credential token directly to your backend at `/auth/google`.

## "Error retrieving a token" - Common Fixes

### 1. Check Google Cloud Console Configuration
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to "APIs & Services" > "Credentials"
- Find your OAuth 2.0 Client ID and ensure it's configured correctly

### 2. Verify Authorized JavaScript Origins
Add these to your OAuth client configuration:
- `http://localhost:3000` (for development)
- `http://localhost:5000` (if using port 5000)
- `https://yourdomain.com` (for production)

### 3. Environment Variables Check
Ensure your `.env.local` file has:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.googleusercontent.com
```

### 4. Backend Endpoint Requirements
Your backend must handle `POST /auth/google` and expect:
```json
{
  "credential": "google-jwt-credential-token"
}
```

### 5. Browser Console Check
Open browser DevTools (F12) and check for:
- Network errors when calling `/auth/google`
- CORS errors
- Google Identity Services script loading errors
- Console error messages

### 6. Test Steps
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Check if the Google script loads: `https://accounts.google.com/gsi/client`
4. Verify the client ID in the network requests
5. Check backend logs for credential validation errors

### 7. Common Issues & Solutions

#### "Google Identity Services not loaded"
- Ensure the script tag is in your layout.tsx
- Check network tab to see if the script loaded successfully

#### "Google Client ID not configured"
- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set in .env.local
- Restart your development server after adding environment variables

#### One Tap prompt doesn't appear
- This is normal - Google controls when to show the One Tap prompt
- Users can still use alternative sign-in methods
- The One Tap may not show if user previously dismissed it

#### Backend authentication fails
- Verify your backend can validate Google JWT credentials
- Check that the credential is being sent correctly to `/auth/google`
- Ensure your backend returns the expected JSON response format

### 8. Updated Implementation Features
- Uses Google Identity Services (latest Google auth library)
- Sends JWT credential directly to your backend
- No custom callback routes needed
- Automatic auth store updates on successful login
- Modern error handling and user feedback
- Credential validation
- Proper script loading with async/defer
- Detailed error messages for debugging
