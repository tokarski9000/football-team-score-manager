<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function playerGames()
    {
        return $this->hasMany(PlayerGame::class);
    }

    public function players()
    {
        return $this->hasManyThrough(
            Player::class,
            PlayerGame::class,
            'team_id',
            'id',
            'id',
            'player_id'
        )->distinct();
    }

    public function games()
    {
        return $this->hasOneThrough(
            Game::class,
            PlayerGame::class,
            'team_id',
            'id',
            'id',
            'game_id'
        );
    }
}
