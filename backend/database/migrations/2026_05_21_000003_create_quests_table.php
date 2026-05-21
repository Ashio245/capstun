<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quests', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->enum('quest_kind', ['quest', 'mission'])->default('quest');
            $table->text('description')->nullable();
            $table->unsignedInteger('base_xp')->default(0);
            $table->unsignedSmallInteger('max_attempts')->nullable();
            $table->timestamp('available_from')->nullable();
            $table->timestamp('due_at')->nullable();
            $table->timestamps();

            $table->unique(['subject_id', 'slug']);
            $table->index(['subject_id', 'quest_kind']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quests');
    }
};
