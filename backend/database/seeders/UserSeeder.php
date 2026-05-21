<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@smartlearn.local',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'name' => 'Professor User',
                'email' => 'prof@smartlearn.local',
                'password' => Hash::make('password'),
                'role' => 'professor',
            ],
            [
                'name' => 'Student User',
                'email' => 'student@smartlearn.local',
                'password' => Hash::make('password'),
                'role' => 'student',
            ],
        ];

        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => $user['password'],
                    'role' => $user['role'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }
    }
}
