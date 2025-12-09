# Vercel Deployment Guide

## Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!**
   - Your portfolio will be live at `https://your-project.vercel.app`
   - Automatic deployments on every push to main branch

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

## Configuration Files

### `vercel.json`
Already configured with:
- Build command: `npm run build`
- Output directory: `.next`
- Framework: Next.js

### Environment Variables (if needed)
If you add any API keys or secrets later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

## Production Notes

✅ **Development Indicator Removed**
- The Next.js development indicator (N icon) only appears in `npm run dev`
- It will NOT appear in production builds on Vercel
- Production build is optimized and clean

✅ **Build Verified**
- Latest build completed successfully
- No TypeScript errors
- Ready for deployment

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Monitoring

After deployment, you can monitor:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Function Logs
- **Performance**: Built-in Web Vitals tracking

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Issues
- Double-check environment variables
- Ensure they're set for the correct environment (Production/Preview)

### Domain Issues
- Verify DNS settings
- Wait for DNS propagation (can take up to 48 hours)
- Check SSL certificate status

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
