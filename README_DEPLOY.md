Deployment notes for Capstun

- Frontend: deploy the `frontend` folder to Vercel as a static Vite build.
- Backend: deploy the `backend` folder to Vercel using the provided `backend/Dockerfile`.

Important prerequisites
- Use a managed Postgres (Vercel Postgres, PlanetScale, Railway, Supabase). Do NOT rely on SQLite on Vercel.
- Generate an `APP_KEY` locally with `php artisan key:generate --show` and set it in Vercel env.

Vercel projects (recommended UI flow)
1. New Project → Import Git Repository → select `ashio245/capstun`.
2. Create two projects from the repo:
   - Frontend: Root Directory = `frontend`, Build = `npm run build`, Output = `dist`.
   - Backend: Root Directory = `backend`, Vercel will use the `Dockerfile`.
3. Add environment variables for backend (DB_*, APP_KEY, APP_URL, etc.).

Local commands to push repo (requires gh CLI):
```bash
git init
git add .
git commit -m "Initial import for capstun"
gh repo create ashio245/capstun --public --source=. --remote=origin --push
```

Generate APP_KEY:
```bash
cd backend
composer install
php artisan key:generate --show
# copy the printed key to Vercel APP_KEY
```

Post-deploy tests
```bash
curl https://<backend-url>/api/v1/health
```

Notes
- For production-grade backend, replace `php artisan serve` with `nginx + php-fpm` in Dockerfile; I can provide that if desired.
