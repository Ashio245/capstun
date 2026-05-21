# backend/Dockerfile - production-friendly PHP + php-fpm (simple staging)
FROM php:8.2-fpm

# system deps
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpq-dev libpng-dev libonig-dev curl \
  && docker-php-ext-install pdo pdo_pgsql zip gd

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# copy only composer files then install
COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# copy app
COPY backend/ ./

# storage/bootstrap perms
RUN mkdir -p storage/framework/{sessions,views,cache} && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 3000

# Run migrations during start, then serve with artisan (simple approach)
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=3000
