# Google OAuth Troubleshooting Guide

## "Error retrieving a token" - Common Fixes

### 1. Check Google Cloud Console Configuration
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to "APIs & Services" > "Credentials"
- Find your OAuth 2.0 Client ID: `819188428825-0cbub6u6sijqvbh7777utffokv0b6bih.apps.googleusercontent.com`

### 2. Verify Authorized JavaScript Origins
Add these to your OAuth client configuration:
- `http://localhost:3000` (for development)
- `http://localhost:5000` (if using port 5000)
- `https://yourdomain.com` (for production)

### 3. Verify Authorized Redirect URIs
Add these to your OAuth client configuration:
- `http://localhost:3000` (for development)
- `http://localhost:5000` (if using port 5000)
- `https://yourdomain.com` (for production)

### 4. Environment Variables Check
Ensure your `.env` file has:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=819188428825-0cbub6u6sijqvbh7777utffokv0b6bih.apps.googleusercontent.com
```

### 5. Browser Console Check
Open browser DevTools (F12) and check for:
- Network errors
- CORS errors
- Google API script loading errors
- Console error messages

### 6. Test Steps
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Check if the Google script loads: `https://accounts.google.com/gsi/client`
4. Verify the client ID in the network requests

### 7. Common Fixes
- Make sure your domain is added to Google Console
- Check if the OAuth consent screen is configured
- Ensure the client ID matches exactly (no extra spaces)
- Verify the project is not suspended in Google Cloud Console

### 8. Updated Code Features
The updated code now includes:
- Better error handling and logging
- Client ID validation
- Credential validation
- Proper script loading with async/defer
- Detailed error messages for debugging
