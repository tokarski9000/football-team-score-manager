<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'player_id' => fake()->numberBetween(1, 12), // TODO: change to PlayerFactory::new()
            'game_id' => fake()->numberBetween(1, 10), // TODO: change to GameFactory::new()
        ];
    }
}
