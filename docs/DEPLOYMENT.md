# Deployment Guide

This guide covers deploying the Zwawla frontend application to various platforms.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [AWS Deployment](#aws-deployment)
- [Manual Deployment](#manual-deployment)
- [CI/CD Setup](#cicd-setup)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Git
- Backend API deployed and accessible
- Domain name (optional)
- SSL certificate (for production)

## 🔐 Environment Configuration

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Staging
```env
NEXT_PUBLIC_API_URL=https://api-staging.zwawla.com
NODE_ENV=production
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.zwawla.com
NODE_ENV=production
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 🚀 Vercel Deployment (Recommended)

### Quick Deploy

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### GitHub Integration

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

3. **Environment Variables**
   - Add all required environment variables
   - Set different values for preview/production

4. **Deploy**
   - Push to main branch for production
   - Push to develop branch for staging

### Custom Domain

1. **Add Domain**
```bash
vercel domains add zwawla.com
```

2. **Configure DNS**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → Vercel IP

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Renews automatically

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3004

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t zwawla-frontend:latest .

# Run container
docker run -d \
  -p 3004:3004 \
  -e NEXT_PUBLIC_API_URL=https://api.zwawla.com \
  --name zwawla-frontend \
  zwawla-frontend:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3004:3004"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.zwawla.com
    restart: unless-stopped
    networks:
      - zwawla-network

networks:
  zwawla-network:
    driver: bridge
```

Run with:
```bash
docker-compose up -d
```

## ☁️ AWS Deployment

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables**
   - Add in Amplify Console
   - Set for each branch

### AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t3.small or larger
   - Security group: Allow 80, 443, 22

2. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

3. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/zwawla/frontend.git
cd frontend

# Install dependencies
npm ci

# Build
npm run build

# Start with PM2
pm2 start npm --name "zwawla-frontend" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name zwawla.com www.zwawla.com;

    location / {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d zwawla.com -d www.zwawla.com
```

## 🔧 Manual Deployment

### Build

```bash
# Install dependencies
npm ci

# Build application
npm run build

# Test build
npm start
```

### Deploy to Server

```bash
# Copy files to server
rsync -avz --exclude 'node_modules' ./ user@server:/var/www/zwawla/

# On server
cd /var/www/zwawla
npm ci --production
npm run build
pm2 restart zwawla-frontend
```

## 🔄 CI/CD Setup

### GitHub Actions

See `.github/workflows/ci.yml` for complete configuration.

**Key Steps:**
1. Lint and type check
2. Run tests
3. Build application
4. Deploy to staging (develop branch)
5. Deploy to production (main branch)

### GitLab CI

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next

deploy:production:
  stage: deploy
  script:
    - vercel --prod --token $VERCEL_TOKEN
  only:
    - main
```

## 📊 Monitoring

### Vercel Analytics

- Automatically enabled
- View in Vercel Dashboard
- Real-time metrics

### Custom Monitoring

```typescript
// lib/monitoring.ts
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

export const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
```

### Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

## 🐛 Troubleshooting

### Build Failures

**Issue**: Build fails with memory error
```bash
# Solution: Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**Issue**: Type errors during build
```bash
# Solution: Run type check
npm run type-check
# Fix errors and rebuild
```

### Deployment Issues

**Issue**: Environment variables not working
- Ensure variables are prefixed with `NEXT_PUBLIC_`
- Restart the application after changes
- Check Vercel/platform dashboard

**Issue**: 404 errors on refresh
- Configure rewrites in `next.config.js`
- Ensure server handles SPA routing

### Performance Issues

**Issue**: Slow page loads
```bash
# Analyze bundle
npm run build
npm run analyze
```

**Issue**: High memory usage
- Enable production mode
- Optimize images
- Implement code splitting

### SSL/HTTPS Issues

**Issue**: Mixed content warnings
- Ensure all resources use HTTPS
- Update API URL to HTTPS
- Check external resources

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] Database migrations run
- [ ] Assets optimized

### Deployment
- [ ] Deploy to staging first
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify API integration
- [ ] Test authentication flow
- [ ] Check error handling

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify SSL certificate
- [ ] Test from different locations
- [ ] Update documentation
- [ ] Notify team

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys secured
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

## 📞 Support

For deployment issues:
- **Email**: devops@zwawla.com
- **Slack**: #deployment channel
- **Documentation**: [docs.zwawla.com/deployment](https://docs.zwawla.com/deployment)

---

Last Updated: January 2026
