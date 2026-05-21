<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('xp_transactions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('quest_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('achievement_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('transaction_type', [
                'quest_award',
                'quest_bonus',
                'quest_penalty',
                'achievement_award',
                'manual_adjustment',
            ]);
            $table->integer('xp_delta');
            $table->decimal('multiplier_value', 5, 2)->nullable();
            $table->string('reason');
            $table->json('meta')->nullable();
            $table->timestamp('awarded_at');
            $table->timestamps();

            $table->index(['user_id', 'subject_id']);
            $table->index(['subject_id', 'transaction_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('xp_transactions');
    }
};