<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Quest;
use App\Models\User;
use Carbon\CarbonInterface;

class RewardEngineService
{
    private const PERFECT_SCORE_MULTIPLIER = 1.50;
    private const EARLY_BIRD_WINDOW_HOURS = 24;
    private const EARLY_BIRD_BONUS_XP = 25;

    public function buildQuestRewardPayload(
        User $student,
        Quest $quest,
        CarbonInterface $submittedAt,
        ?CarbonInterface $assignedAt = null,
        ?int $score = null,
        ?int $maxScore = null
    ): array {
        $baseXp = (int) $quest->base_xp;
        $earlyBirdBonus = $this->calculateEarlyBirdBonus($assignedAt, $submittedAt);
        $perfectScoreMultiplier = $this->calculatePerfectScoreMultiplier($score, $maxScore);

        $rewardXp = (int) round(($baseXp + $earlyBirdBonus) * $perfectScoreMultiplier);

        return [
            'user_id' => $student->id,
            'subject_id' => $quest->subject_id,
            'quest_id' => $quest->id,
            'transaction_type' => $earlyBirdBonus > 0 || $perfectScoreMultiplier > 1
                ? 'quest_bonus'
                : 'quest_award',
            'xp_delta' => $rewardXp,
            'multiplier_value' => $perfectScoreMultiplier > 1 ? $perfectScoreMultiplier : null,
            'reason' => $this->buildReason($earlyBirdBonus, $perfectScoreMultiplier),
            'meta' => [
                'base_xp' => $baseXp,
                'early_bird_bonus_xp' => $earlyBirdBonus,
                'perfect_score_multiplier' => $perfectScoreMultiplier,
                'submitted_at' => $submittedAt->toIso8601String(),
                'assigned_at' => $assignedAt?->toIso8601String(),
            ],
            'awarded_at' => $submittedAt->toDateTimeString(),
        ];
    }

    public function calculateEarlyBirdBonus(
        ?CarbonInterface $assignedAt,
        CarbonInterface $submittedAt
    ): int {
        if ($assignedAt === null) {
            return 0;
        }

        if ($submittedAt->lessThan($assignedAt)) {
            return 0;
        }

        if ($assignedAt->diffInHours($submittedAt) >= self::EARLY_BIRD_WINDOW_HOURS) {
            return 0;
        }

        return self::EARLY_BIRD_BONUS_XP;
    }

    public function calculatePerfectScoreMultiplier(?int $score, ?int $maxScore): float
    {
        if ($score === null || $maxScore === null || $maxScore <= 0) {
            return 1.0;
        }

        if ($score < $maxScore) {
            return 1.0;
        }

        return self::PERFECT_SCORE_MULTIPLIER;
    }

    private function buildReason(int $earlyBirdBonus, float $perfectScoreMultiplier): string
    {
        $reasons = ['Quest completion reward'];

        if ($earlyBirdBonus > 0) {
            $reasons[] = 'Early Bird bonus';
        }

        if ($perfectScoreMultiplier > 1) {
            $reasons[] = 'Perfect Score multiplier';
        }

        return implode(' + ', $reasons);
    }
}
