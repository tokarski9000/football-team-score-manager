<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Goal;
use App\Models\Player;
use App\Models\PlayerGame;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@admin.pl',
            'password' => '123'
        ]);
        Player::factory()
            ->count(12)
            ->create();
        Game::factory()
            ->count(10)
            ->create();
        Goal::factory()
            ->count(20)
            ->create();
        for($i = 0; $i < 10; $i++) {
            for($j = 0; $j < 12; $j++) {
                PlayerGame::factory()->create(
                    [
                        'game_id' => $i+1,
                        'player_id' => $j+1,
                    ]
                );
            }
        }
    }
}
