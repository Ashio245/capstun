<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Quest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuestController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $subjectId = $request->query('subject_id');

        $query = Quest::query()->select(['id', 'subject_id', 'title', 'slug', 'quest_kind', 'description', 'base_xp', 'available_from', 'due_at']);

        if ($subjectId) {
            $query->where('subject_id', $subjectId);
        }

        $quests = $query->get();

        return response()->json(['data' => $quests]);
    }
}
