<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\PlayerGame;
use Inertia\Inertia;

class GameController extends Controller
{
    public function __construct(protected PlayerGame $playerGame, protected Game $game)
    {
    }

    public function index()
    {
        $games = $this->game->with('players', 'players.goals')->get();

        return Inertia::render('Games', [
            'games' => $games,
        ]);
    }
}
