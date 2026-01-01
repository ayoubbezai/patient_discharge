# Setup Guide

Complete guide to set up the Zwawla frontend application from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher
- **Git**: Latest version
- **Code Editor**: VS Code (recommended)

### Verify Installation

```bash
node --version  # Should be v20.0.0 or higher
npm --version   # Should be v10.0.0 or higher
git --version   # Any recent version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/zwawla/frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- TanStack Query
- And more...

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3004](http://localhost:3004)

## 🔧 Detailed Setup

### Backend API Setup

The frontend requires the backend API to be running. Follow these steps:

1. **Clone Backend Repository**
```bash
git clone https://github.com/zwawla/backend.git
cd backend
```

2. **Install Backend Dependencies**
```bash
npm install
```

3. **Configure Backend**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run Migrations**
```bash
npm run migrate
```

5. **Start Backend Server**
```bash
npm run dev
```

Backend should be running on `http://localhost:3000`

### Database Setup

The backend uses PostgreSQL. You can use:

#### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start  # Ubuntu

# Create database
createdb zwawla
```

#### Option 2: Docker PostgreSQL

```bash
docker run --name zwawla-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=zwawla \
  -p 5432:5432 \
  -d postgres:15
```

#### Option 3: Cloud Database

Use services like:
- Supabase
- Railway
- Neon
- AWS RDS

## 🛠️ Development Tools

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 📦 Project Structure

After setup, your project structure should look like:

```
zwawla-frontend/
├── .github/              # GitHub workflows
├── .next/                # Next.js build output (generated)
├── app/                  # Application pages
├── components/           # React components
├── docs/                 # Documentation
├── lib/                  # Utilities and services
├── node_modules/         # Dependencies (generated)
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose config
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── README.md             # Project readme
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🧪 Testing Setup

### Run Tests

```bash
npm test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run test:coverage
```

## 🎨 Code Style Setup

### ESLint

ESLint is configured automatically. Run:

```bash
npm run lint
```

Fix issues automatically:

```bash
npm run lint:fix
```

### Prettier

Format code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

### TypeScript

Type check:

```bash
npm run type-check
```

## 🐳 Docker Setup

### Build Docker Image

```bash
npm run docker:build
```

### Run Docker Container

```bash
npm run docker:run
```

### Docker Compose

```bash
npm run docker:compose
```

Stop containers:

```bash
npm run docker:down
```

## 🔐 Authentication Setup

### Test Credentials

For development, you can use these test credentials:

```
Email: user@example.com
Password: password123
```

### Create New User

1. Go to [http://localhost:3004/signup](http://localhost:3004/signup)
2. Fill in the registration form
3. Submit to create account
4. Login with your credentials

## 🌐 API Configuration

### API Endpoints

The application connects to these endpoints:

- **Base URL**: `http://localhost:3000`
- **Auth**: `/auth/*`
- **Stadiums**: `/stadiums/*`
- **Bookings**: `/bookings/*`
- **Matches**: `/matches/*`
- **Users**: `/users/*`

### API Testing

Test API connection:

```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

## 🚨 Troubleshooting

### Port Already in Use

If port 3004 is already in use:

```bash
# Find process using port
lsof -i :3004

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3005
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clean build
npm run clean
npm install
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# If errors persist, restart TS server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### API Connection Issues

1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Check CORS settings in backend
4. Check network/firewall settings

## 📚 Next Steps

After setup is complete:

1. **Read Documentation**
   - [README.md](../README.md) - Project overview
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture

2. **Explore the Code**
   - Start with `app/page.tsx`
   - Check `components/` for reusable components
   - Review `lib/` for utilities

3. **Make Your First Change**
   - Create a new branch
   - Make a small change
   - Test it locally
   - Submit a pull request

4. **Join the Community**
   - Discord: [discord.gg/zwawla](https://discord.gg/zwawla)
   - Email: dev@zwawla.com

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**: Review all docs in `/docs`
2. **Search Issues**: [GitHub Issues](https://github.com/zwawla/frontend/issues)
3. **Ask Community**: Discord server
4. **Contact Team**: dev@zwawla.com

## ✅ Setup Checklist

- [ ] Node.js 20+ installed
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Backend API running
- [ ] Database setup complete
- [ ] Development server running
- [ ] Can access http://localhost:3004
- [ ] Can login successfully
- [ ] VS Code extensions installed
- [ ] Git configured

---

**Congratulations!** 🎉 You're all set up and ready to develop!

Last Updated: January 2026
