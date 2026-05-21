<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SmartLearnPilotSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $subjects = [
            [
                'code' => 'CP1',
                'name' => 'Computer Programming 1',
                'description' => 'Pilot subject for introductory programming concepts.',
            ],
            [
                'code' => 'DS',
                'name' => 'Data Structures',
                'description' => 'Pilot subject for core data structures and algorithms.',
            ],
            [
                'code' => 'DBM',
                'name' => 'Database Management',
                'description' => 'Pilot subject for relational design and MySQL practice.',
            ],
        ];

        foreach ($subjects as $subject) {
            DB::table('subjects')->updateOrInsert(
                ['code' => $subject['code']],
                [
                    'name' => $subject['name'],
                    'description' => $subject['description'],
                    'is_active' => true,
                    'updated_at' => $now,
                    'created_at' => $now,
                ]
            );
        }
    }
}
