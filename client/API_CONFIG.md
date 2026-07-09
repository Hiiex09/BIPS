# API Configuration Guide

## Overview

The API client has been refactored to support both development and production environments with proper axios configuration and centralized API management.

## Changes Made

### 1. **Centralized Axios Configuration** (`src/api/axios.js`)

- ✅ Removed hardcoded localhost URLs
- ✅ Added environment variable support (`VITE_API_URL`)
- ✅ Added response interceptors for error handling
- ✅ Added request timeout (10 seconds)
- ✅ Automatic fallback to relative paths in production

### 2. **Updated API Modules**

All API files now use the centralized `axiosInstance`:

- ✅ `auth_api.js` - Uses relative paths instead of hardcoded URLs
- ✅ `announcement_api.js` - Uses relative paths instead of hardcoded URLs
- ✅ `user_api.js` - Uses relative paths instead of hardcoded URLs

**Key improvements:**

- Consistent error logging
- Proper data passing (removed unnecessary object wrapping)
- Cleaner code using centralized configuration

### 3. **Environment Variables**

Created three environment files:

#### `.env.local` (Development)

```
VITE_API_URL=http://localhost:4000/api/v1
```

#### `.env.production` (Production)

```
VITE_API_URL=https://api.yourdomain.com/api/v1
```

#### `.env.example` (Template)

Copy this to `.env.local` and customize for your environment.

## Configuration for Production

### Option 1: Using Environment Variables (Recommended)

1. Set `VITE_API_URL` to your production API domain:

   ```bash
   VITE_API_URL=https://your-production-api.com/api/v1
   ```

2. Deploy with:
   ```bash
   npm run build
   ```

### Option 2: Using Relative Paths (Same Domain)

If your frontend and backend are on the same domain (e.g., both on `https://yourdomain.com`):

- Simply don't set `VITE_API_URL`
- The app will automatically use `/api/v1` relative paths

### Option 3: Using Proxy (Vite Config)

If you want to proxy API requests during development, update `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
```

## Testing

### Development

```bash
# Make sure server runs on http://localhost:4000
npm run dev
```

### Production Build

```bash
# Build with production settings
npm run build

# Preview the production build
npm run preview
```

## Troubleshooting

### CORS Issues

- Ensure your backend includes proper CORS headers
- The `withCredentials: true` option requires explicit CORS configuration on the backend

### 401/403 Errors

- Check that authentication tokens are valid
- Verify cookies are being sent with requests
- Check browser DevTools > Network tab for cookie details

### Timeout Errors

- Increase timeout in `axios.js` if needed (currently 10 seconds)
- Check backend server is running and accessible

### API URL Not Resolving

- In development: Ensure `.env.local` is created and server is running on localhost:4000
- In production: Verify `VITE_API_URL` environment variable is set correctly

## Security Notes

✅ **withCredentials enabled** - Sends cookies with cross-origin requests  
✅ **Environment-based URLs** - No hardcoded sensitive data  
✅ **Error interceptors** - Graceful error handling  
✅ **Request timeout** - Prevents hanging requests

## Next Steps

1. Update `.env.production` with your actual production API URL
2. Test the build locally: `npm run build && npm run preview`
3. Deploy with proper environment variables set

For questions or issues, review the axios configuration in `src/api/axios.js`.
