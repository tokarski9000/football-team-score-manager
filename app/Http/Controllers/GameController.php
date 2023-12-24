<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\PlayerGame;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class GameController extends Controller
{
    public function __construct(protected PlayerGame $playerGame, protected Game $game)
    {
    }

    public function index()
    {
        $games = $this->game->with('teams.players.goals')->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'games' => $games,
        ]);
    }
}
