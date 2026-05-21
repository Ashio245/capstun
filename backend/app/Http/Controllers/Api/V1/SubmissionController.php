<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Quest;
use App\Models\User;
use App\Models\XpTransaction;
use App\Services\RewardEngineService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SubmissionController extends Controller
{
    public function submit(Request $request, RewardEngineService $rewardEngine, $questId): JsonResponse
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'score' => ['nullable', 'integer', 'min:0'],
            'max_score' => ['nullable', 'integer', 'min:1'],
            'submitted_at' => ['nullable', 'date'],
        ]);

        $user = User::findOrFail($data['user_id']);
        $quest = Quest::findOrFail($questId);

        $submittedAt = isset($data['submitted_at']) ? Carbon::parse($data['submitted_at']) : Carbon::now();
        $assignedAt = $quest->available_from;

        $payload = $rewardEngine->buildQuestRewardPayload(
            $user,
            $quest,
            $submittedAt,
            $assignedAt,
            $data['score'] ?? null,
            $data['max_score'] ?? null
        );

        $transaction = XpTransaction::create($payload);

        return response()->json(['data' => $transaction], 201);
    }
}
