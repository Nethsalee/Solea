# Deployment Guide

This guide covers deploying the SOLEA e-commerce platform to various hosting providers.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Git Integration**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js and configure build settings
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Deploy via CLI**
   ```bash
   vercel
   ```

### Environment Variables

Add these in your Vercel dashboard under Project Settings → Environment Variables:

```
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

## Netlify

1. Connect your Git repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy!

## Docker

### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t solea .
docker run -p 3000:3000 solea
```

## Self-Hosting

### Prerequisites
- Node.js 18+
- npm or yarn
- Process manager (PM2 recommended)

### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Install PM2**
   ```bash
   npm install -g pm2
   ```

3. **Create ecosystem.config.js**
   ```javascript
   module.exports = {
     apps: [{
       name: 'solea',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

Remember to set all required environment variables in your production environment:

- Copy `.env.local.example` to `.env.local`
- Fill in all values
- Never commit `.env.local` to version control

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify images are optimized and loading
- [ ] Check mobile responsiveness
- [ ] Test cart and wishlist functionality
- [ ] Verify API routes work
- [ ] Check SEO meta tags
- [ ] Test performance with Lighthouse
- [ ] Set up monitoring and analytics
- [ ] Configure custom domain and SSL

## Performance Optimization

- Enable image optimization
- Configure caching headers
- Use CDN for static assets
- Enable compression
- Monitor Core Web Vitals

## Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Clear `.next` folder and `node_modules`
- Run `npm install` again
- Check for TypeScript errors

### Images Not Loading

- Verify `next.config.js` has correct remote patterns
- Check image URLs are accessible
- Ensure proper CORS headers

For more help, check the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
