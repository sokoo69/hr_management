# HR Management System

A full-stack HR Management System built with React and Node.js.

## Project Structure

```
hr_management_system/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root package.json for monorepo
├── vercel.json      # Vercel deployment configuration
└── README.md
```

## Local Development

1. Install dependencies:
```bash
npm run install:all
```

2. Start development servers:
```bash
npm run dev
```

This will start both the React frontend (port 5173) and Node.js backend (port 5000).

## Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas database
- Environment variables configured

### Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Configure Environment Variables**:
   In Vercel dashboard, go to your project settings and add:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=your_jwt_expire_time
   # Add other environment variables as needed
   ```

4. **Deploy**:
   - Vercel will automatically build and deploy
   - The frontend will be served from the root
   - API routes will be available at `/api/*`

### Environment Variables Required

Make sure to set these in your Vercel project settings:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRE` - JWT expiration time
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password
- Any other environment variables your app uses

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure you have the root `package.json` and `vercel.json` files
2. **Build Failures**: Check that all dependencies are properly installed
3. **API Routes Not Working**: Verify your server exports the app correctly for Vercel
4. **Database Connection**: Ensure MongoDB URI is correctly set in environment variables

### File Structure Requirements

- Root `package.json` with workspaces configuration
- `vercel.json` with proper build and route configuration
- Server must export the Express app (not start listening immediately)
- Client must have proper build script in package.json
