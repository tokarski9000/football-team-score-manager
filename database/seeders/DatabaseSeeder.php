<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Goal;
use App\Models\Player;
use App\Models\PlayerGame;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
          'name' => 'admin',
          'email' => 'pilka@nozna.pl',
          'password' => 'trudnehaslo',
        ]);

        Team::factory()
            ->count(2)
            ->create();
    }
}
