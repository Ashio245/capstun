<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;

class SubjectController extends Controller
{
    public function index(): JsonResponse
    {
        $subjects = Subject::query()->where('is_active', true)->get(['id', 'code', 'name', 'description']);

        return response()->json(['data' => $subjects]);
    }
}
