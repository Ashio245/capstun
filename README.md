# SmartLearn

Minimal full-stack scaffold for the SmartLearn LMS pilot.

## Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- Backend uses Laravel-style PHP 8.x structure.
- Frontend uses React + Vite + Tailwind CSS.
- Pilot seed data includes Computer Programming 1, Data Structures, and Database Management.
