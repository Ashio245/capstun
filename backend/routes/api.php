<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
        ]);
    });
    
    Route::get('/subjects', [\App\Http\Controllers\Api\V1\SubjectController::class, 'index']);
    Route::get('/quests', [\App\Http\Controllers\Api\V1\QuestController::class, 'index']);
    Route::post('/quests/{quest}/submit', [\App\Http\Controllers\Api\V1\SubmissionController::class, 'submit']);
});