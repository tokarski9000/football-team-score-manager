<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'date',
        'place',
    ];

    /**
     * The users that belong to the role.
     */
    public function playerGames(): HasMany
    {
        return $this->hasMany(PlayerGame::class);
    }

    public function players()
    {
        return $this->hasManyThrough(
            Player::class,
            PlayerGame::class,
            'game_id',
            'id',
            'id',
            'player_id'
        );
    }

    public function goals()
    {
        return $this->hasManyThrough(Goal::class, Player::class);
    }

    public function teams()
    {
        return $this->hasManyThrough(Team::class, PlayerGame::class, 'game_id', 'id', 'id', 'team_id')->distinct();
    }
}