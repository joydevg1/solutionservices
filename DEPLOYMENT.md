# Deploy solutionservices.co.in

This guide connects your GoDaddy domain to **free hosting**:

| Part | URL | Host |
|------|-----|------|
| Website (React) | `https://solutionservices.co.in` | Cloudflare Pages (free) |
| API (Flask) | `https://api.solutionservices.co.in` | Fly.io (free tier, persistent DB) |

---

## Architecture

```
User → solutionservices.co.in → Cloudflare Pages (static React)
User → api.solutionservices.co.in → Fly.io (Flask + Gunicorn + SQLite)
```

---

## Part 1 — Push code to GitHub

1. Create a repo on GitHub (e.g. `solution-services`).
2. Push this project:

```bash
cd "solution _services"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/solution-services.git
git push -u origin main
```

Do **not** commit `.env` files with real secrets (they should stay local).

---

## Part 2 — Deploy backend (Fly.io)

Fly.io keeps your SQLite database on a **persistent volume** (important for bookings/users).

### 2.1 Install Fly CLI

Download from https://fly.io/docs/hands-on/install-flyctl/

### 2.2 Login and create app

```bash
cd backend
fly auth login
fly launch --no-deploy
```

- Use app name: `solution-services-api` (or change `app` in `fly.toml`)
- Region: `bom` (Mumbai) or nearest to India
- Do **not** add Postgres
- Say **yes** to creating a volume when prompted (name: `solution_services_data`)

### 2.3 Set secrets (production env)

Generate a JWT secret (PowerShell):

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Set secrets on Fly:

```bash
fly secrets set ^
  JWT_SECRET="PASTE_YOUR_LONG_SECRET_HERE" ^
  ADMIN_BOOTSTRAP_KEY="YourStrongAdminKey2026" ^
  ADMIN_EMAILS="admin@solutionservices.co.in" ^
  ALLOWED_ORIGINS="https://solutionservices.co.in,https://www.solutionservices.co.in" ^
  FLASK_ENV="production" ^
  DEBUG="False"
```

Replace `admin@solutionservices.co.in` with the email you will use for admin login.

### 2.4 Deploy

```bash
fly deploy
```

### 2.5 Verify API

```bash
fly open /api/health
```

You should see: `{"status":"ok"}`

### 2.6 Add custom domain on Fly

```bash
fly certs add api.solutionservices.co.in
```

Fly will show DNS records — you will add these in GoDaddy (Part 4).

---

## Part 3 — Deploy frontend (Cloudflare Pages)

### 3.1 Sign up

Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

### 3.2 Build settings

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Build output | `dist` |
| Environment variable | `VITE_API_BASE_URL` = `https://api.solutionservices.co.in/api` |

The file `frontend/.env.production` already has this URL for local production builds.

### 3.3 Deploy

Click **Save and Deploy**. Wait for the build to finish.

### 3.4 Add custom domains

In Pages → your project → **Custom domains**:

- Add `solutionservices.co.in`
- Add `www.solutionservices.co.in`

Cloudflare will show DNS records to add (Part 4).

---

## Part 4 — GoDaddy DNS (connect your domain)

Log in to **GoDaddy** → **My Products** → **solutionservices.co.in** → **DNS**.

### Option A — Keep DNS at GoDaddy (simpler)

Add these records (values come from Fly + Cloudflare dashboards after you add custom domains):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `api` | `solution-services-api.fly.dev` (or value Fly shows) | 600 |
| CNAME | `www` | `your-project.pages.dev` (from Cloudflare Pages) | 600 |
| A | `@` | IP from Cloudflare Pages for apex domain | 600 |

**Note:** Apex (`@`) on GoDaddy sometimes needs Cloudflare’s A record IPs — Cloudflare Pages shows exact values when you add `solutionservices.co.in`.

### Option B — Use Cloudflare DNS (recommended)

1. Create free Cloudflare account.
2. Add site `solutionservices.co.in`.
3. Cloudflare gives you **two nameservers** (e.g. `ada.ns.cloudflare.com`).
4. In GoDaddy → **Nameservers** → **Change** → **Custom** → paste Cloudflare nameservers.
5. Manage all DNS in Cloudflare (Pages + Fly records auto-configure more easily).

### SSL

Both Fly.io and Cloudflare Pages issue **free HTTPS** certificates automatically after DNS propagates (usually 5–60 minutes).

---

## Part 5 — Test after DNS propagates

1. **API health:** https://api.solutionservices.co.in/api/health  
2. **Website:** https://solutionservices.co.in  
3. **Login** as customer with any name/email.  
4. **Admin login:** email in `ADMIN_EMAILS` + your `ADMIN_BOOTSTRAP_KEY`.  
5. Create a booking → approve in admin dashboard.

---

## Part 6 — Migrate existing local data (optional)

If you have data in local `urban_services.db`:

```bash
# Copy DB to Fly volume (after first deploy)
fly ssh sftp shell
put urban_services.db /data/urban_services.db
```

Or re-seed by using the app fresh on production.

---

## Alternative: Render (easier, but SQLite resets on free tier)

Use `backend/render.yaml` — connect repo in Render dashboard.

1. Render → **New** → **Blueprint** → select repo.
2. Set `ADMIN_BOOTSTRAP_KEY` manually in dashboard.
3. Custom domain: `api.solutionservices.co.in` → add CNAME in GoDaddy.

**Warning:** Render free tier may **wipe SQLite** on restart. Use Fly.io for real production data.

---

## Environment summary

### Frontend (`frontend/.env.production`)

```
VITE_API_BASE_URL=https://api.solutionservices.co.in/api
```

### Backend (Fly secrets / `.env.production.example`)

```
FLASK_ENV=production
DEBUG=False
JWT_SECRET=<long random string>
ADMIN_BOOTSTRAP_KEY=<your admin key>
ADMIN_EMAILS=admin@solutionservices.co.in
ALLOWED_ORIGINS=https://solutionservices.co.in,https://www.solutionservices.co.in
DATABASE_PATH=/data/urban_services.db
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| CORS error in browser | Check `ALLOWED_ORIGINS` includes exact URL (https, no trailing slash) |
| API 404 | Confirm `VITE_API_BASE_URL` ends with `/api` |
| Login works locally, not live | Clear browser `ss_token` / `ss_user`; re-login |
| Blank page after refresh | `_redirects` in `frontend/public` handles SPA routing |
| DB empty after redeploy on Render | Switch to Fly.io with volume |
| SSL pending | Wait for DNS; check CNAME points correctly |

---

## Quick checklist

- [ ] Code on GitHub
- [ ] Fly.io backend deployed
- [ ] Fly secrets set (JWT, admin key, CORS)
- [ ] Cloudflare Pages frontend deployed
- [ ] GoDaddy DNS: `api` → Fly, `www` + `@` → Cloudflare Pages
- [ ] https://api.solutionservices.co.in/api/health returns OK
- [ ] https://solutionservices.co.in loads and can book a service
