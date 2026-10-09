# Render.com Deployment Guide

## Error Resolution

The build error `"Exited with status 254 while building your code"` with npm looking for `/opt/render/project/src/package.json` indicates Render is looking in the wrong directory.

## Solution: Deploy as Separate Services

This monorepo has **two separate services** that should be deployed independently:

### Option 1: Two Separate Render Services (Recommended)

#### 1️⃣ **Backend Service (Node.js API)**

Create a new Render Web Service:

**Service Details:**

- Name: `bips-api`
- Environment: `Node`
- Region: Singapore (or your preferred region)
- Plan: Free/Paid

**Build & Deploy Settings:**

- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**

```
NODE_ENV=production
MONGODB_URI=<your mongodb connection string>
JWT_SECRET=<your secret key>
CLOUDINARY_NAME=<your cloudinary name>
CLOUDINARY_KEY=<your cloudinary key>
CLOUDINARY_SECRET=<your cloudinary secret>
CORS_ORIGIN=<your frontend domain>
```

**Deploy URL:** `https://bips-api.onrender.com`

---

#### 2️⃣ **Frontend Service (Static Site)**

Create a new Render Static Site:

**Service Details:**

- Name: `bips-client`
- Environment: `Static Site`

**Build & Deploy Settings:**

- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

**Environment Variables:**

```
VITE_API_URL=https://bips-api.onrender.com/api/v1
```

---

## Option 2: Single Service (Backend Serves Frontend)

If you want a single service, modify the **server** to serve the built frontend:

### Step 1: Update Server Package.json

```json
"scripts": {
  "build": "npm install --prefix ../client && npm run build --prefix ../client",
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

### Step 2: Update Server index.js

```javascript
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ... middleware ...

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use("/api/v1", apiRoutes);

// Serve React app for all other routes (for SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 3: Create render.yaml

```yaml
services:
  - type: web
    name: bips
    env: node
    region: singapore
    plan: free
    rootDir: server
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: CLOUDINARY_NAME
        sync: false
      - key: CLOUDINARY_KEY
        sync: false
      - key: CLOUDINARY_SECRET
        sync: false
```

---

## Quick Fix: Current Render Configuration

1. **Delete the current service** from Render (the one showing the error)

2. **Create two new services:**

   **Service 1 - Backend:**
   - Connect GitHub repo
   - Branch: `main`
   - **Build & Deploy Settings:**
     ```
     Root Directory: server
     Build Command: npm install
     Start Command: npm start
     ```

   **Service 2 - Frontend:**
   - Connect GitHub repo
   - Branch: `main`
   - **Build & Deploy Settings:**
     ```
     Root Directory: client
     Build Command: npm install && npm run build
     Publish Directory: dist
     ```

3. **Set Environment Variables:**

   **Backend (.env in server/):**

   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   CLOUDINARY_NAME=your_name
   CLOUDINARY_KEY=your_key
   CLOUDINARY_SECRET=your_secret
   CORS_ORIGIN=https://bips-client.onrender.com
   ```

   **Frontend (.env in client/):**

   ```
   VITE_API_URL=https://bips-api.onrender.com/api/v1
   ```

---

## Troubleshooting

### Build Still Failing?

1. **Clear Render cache:**
   - Go to Service Settings → Deploys
   - Click the "Clear Cache" button before redeploying

2. **Check Node version:**
   - Ensure `.node-version` file exists with value `18` or `20`

3. **Verify package.json structure:**
   - Root: Has scripts for monorepo
   - Server: Has `npm start` that runs `node src/index.js`
   - Client: Has `npm run build` that outputs to `dist/`

4. **Check logs:**
   - View build logs in Render dashboard
   - Look for the exact error message and path

### CORS Issues After Deploy?

Update server environment variable:

```
CORS_ORIGIN=https://your-frontend-domain.onrender.com
```

### API URL Not Working?

Ensure frontend has correct environment variable:

```
VITE_API_URL=https://your-backend-domain.onrender.com/api/v1
```

---

## Next Steps

1. Delete current failed Render service
2. Create two separate services (recommended) or one combined service
3. Set all required environment variables
4. Deploy and monitor logs
5. Test API connectivity from frontend

Need help? Check Render documentation: https://render.com/docs
