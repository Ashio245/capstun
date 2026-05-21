<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\RewardEngineService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(RewardEngineService::class);
    }

    public function boot(): void
    {
    }
}