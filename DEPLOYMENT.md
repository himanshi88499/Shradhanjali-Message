# શ્રદ્ધાંજલિ (Shradhanjali) - Deployment & Setup Guide (Cloudways & Hostinger)

This guide provides step-by-step instructions for deploying the **Shradhanjali Gujarati CMS Website** to **Cloudways** and **Hostinger**.

---

## 🚀 Cloudways Deployment Instructions (Fix for PM2 Crash)

If your Cloudways deployment failed with `Application failed to start - process crashed (at least 15 restart(s) detected)` while running `$ npx next start`:

### Why this happens on Cloudways:
1. In Cloudways Node.js applications, PM2 manages the application process. When PM2 runs `npx next start`, `npx` acts as a temporary CLI wrapper and disconnects, which PM2 interprets as a process crash and restarts it 15 times before aborting.
2. Next.js production on Cloudways requires a persistent Node.js process listening on `0.0.0.0:${PORT:-3000}`.

### The Solution:
We have added a production-ready `server.js` and `ecosystem.config.cjs` to the repository.

In your **Cloudways Platform Dashboard**:
1. Open your application -> **Application Settings** (or **Deployment via Git** / **General Settings**).
2. Set the **Start Command** to:
   ```bash
   node server.js
   ```
   *(or `npm start`)*
3. Ensure the **Build Command** is:
   ```bash
   npm run build
   ```
4. Click **Save Changes** and click **Deploy / Redeploy**.
5. Your application will start cleanly and stay running with PM2.

---

## 1. Hosting Requirements & Plan Selection

Hostinger supports Node.js applications across two primary hosting environments:

### Option A: Hostinger Business Web Hosting / Cloud Hosting (Recommended for Ease)
- **Control Panel:** Hostinger hPanel
- **Feature:** Built-in **Node.js Application Manager**
- **Requirements:** Node.js v18.x, v20.x, or v22.x+
- **Best for:** Direct deployment through file upload / Git with minimal server maintenance.

### Option B: Hostinger VPS (Virtual Private Server) (Recommended for Full Control)
- **OS:** Ubuntu 22.04 LTS or 24.04 LTS
- **Stack:** Node.js, PM2 Process Manager, Nginx Reverse Proxy, Let's Encrypt SSL
- **Best for:** High traffic, complete server control, and custom background workers.

---

## 2. Deploying on Hostinger hPanel (Node.js App Manager)

Follow these steps if you are using Hostinger Business Web Hosting or Cloud Hosting:

### Step 1: Prepare the Files
1. Build the production application locally or in CI:
   ```bash
   npm run build
   ```
2. Prepare a `.zip` archive containing:
   - `.next/` (build folder)
   - `public/` (images, uploads, static assets)
   - `data/` (contains `db.json` database)
   - `package.json` and `package-lock.json`
   - `next.config.ts`
   - `.env.example` (renamed to `.env.local` or `.env`)

### Step 2: Upload Files in hPanel
1. Log in to your **Hostinger hPanel**.
2. Navigate to **Websites** -> Select your domain -> Open **File Manager**.
3. Upload the prepared `.zip` to `public_html/` (or your subdomain directory).
4. Extract the zip archive.

### Step 3: Configure Node.js Application
1. In hPanel, search for **Node.js** under the **Advanced** section.
2. Click **Create Application** and configure the fields:
   - **Node.js version:** Select `20.x` or `22.x` (LTS)
   - **Application root:** `public_html` (or your app directory)
   - **Application URL:** Select your domain (e.g., `https://shradhanjali.in`)
   - **Application startup file:** `node_modules/next/dist/bin/next` or standard runner `npm start`
3. Click **Create**.

### Step 4: Install Dependencies & Run
1. In the Node.js Manager, click **NPM Install** (or access SSH / Web Terminal and run `npm install --omit=dev`).
2. Set Environment Variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `SESSION_SECRET=your_long_random_secret_key`
3. Click **Start Application** or **Restart**.

---

## 3. Deploying on Hostinger VPS (Ubuntu + PM2 + Nginx)

Follow these steps for deploying on a Hostinger VPS:

### Step 1: Connect to VPS via SSH
```bash
ssh root@your-vps-ip
```

### Step 2: Install Node.js (LTS), PM2, and Nginx
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x or 22.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Verify installation
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

### Step 3: Clone or Upload Project
```bash
# Navigate to web root
cd /var/www

# Clone your repository or upload files
git clone <your-repository-url> shradhanjali
cd shradhanjali

# Install dependencies
npm install

# Build the production bundle
npm run build
```

### Step 4: Start Application with PM2
```bash
# Start the application
pm2 start npm --name "shradhanjali" -- start

# Save PM2 process list to start automatically on system reboot
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy
Create an Nginx configuration file for your domain:
```bash
sudo nano /etc/nginx/sites-available/shradhanjali.in
```

Paste the following configuration:
```nginx
server {
    listen 80;
    server_name shradhanjali.in www.shradhanjali.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Uploads limit
    client_max_body_size 20M;
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/shradhanjali.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Install Free SSL with Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d shradhanjali.in -d www.shradhanjali.in
```

---

## 4. Database Setup & Options

### Default: Zero-Configuration File Storage (Immediate Out-of-the-Box)
- The site ships with a built-in ACID database in `data/db.json`.
- It comes pre-seeded with all 12 articles, 6 categories, pages, menus, settings, and the default admin.
- It requires **zero external database server**, ensuring 100% functionality on Hostinger without setting up MySQL or PostgreSQL.
- Ensure the `data/` and `public/uploads/` folders have write permissions:
  ```bash
  chmod -R 775 data public/uploads
  ```

### Option B: Managed PostgreSQL or Supabase
If you prefer using an external PostgreSQL database or Supabase:
1. Open `schema.sql` included in the root directory.
2. Execute `schema.sql` in your PostgreSQL or Supabase SQL editor.
3. Add `DATABASE_URL=postgresql://user:password@host:5432/dbname` to your `.env.local`.

---

## 5. First-Time Administration Access

1. Visit: `https://your-domain.com/admin/login`
2. Enter default administrative credentials:
   - **Email:** `admin@shradhanjali.in`
   - **Password:** `Admin@12345`
3. Once logged in:
   - Navigate to **Users & Roles** or **Settings** to update your email and password.
   - Configure your Google Analytics 4 Measurement ID under **Settings -> Technical**.
   - Manage categories, create posts, upload media, or edit menus with instant live reflection.
