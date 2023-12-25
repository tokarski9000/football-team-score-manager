<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerGame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class GameController extends Controller
{
    public function __construct(protected PlayerGame $playerGame, protected Game $game, protected Player $player)
    {
    }

    public function create(Request $request)
    {
        $game = $this->game->create([
            'date' => $request->date,
            'place' => $request->place,
        ]);


        foreach ($request->players as $player) {
            $this->playerGame->create([
                'player_id' => $player,
                'game_id' => $game->id,
                'team_id' => null
            ]);
        }

        return redirect()->route('home');
    }

    public function createPage()
    {
        $players = $this->player->get();

        return Inertia::render('Game/index',
            [
                'players' => $players,
            ]);
    }

    public function index()
    {
        $games = $this->game->with('playerGames.player', 'goals', 'teams')->orderByDesc('id')->get();
        // Map necessary information to the games.
        foreach ($games as $game) {

            $players = array_map(function ($playerGame) {
                $player = $playerGame['player'];
                $player['team_id'] = $playerGame['team_id'];

                return $player;
            }, $game->playerGames->toArray());

            $score = [];

            // Calculate goals.
            foreach ($players as $i => $player) {
                // Set default values.
                $players[$i]['goals'] = $players[$i]['goals'] ?? 0;
                $score[$player['team_id']] = $score[$player['team_id']] ?? 0;

                foreach ($game->goals as $goal) {
                    if ($player['id'] === $goal->player_id) {
                        $players[$i]['goals']++;
                        $score[$player['team_id']] = isset($score[$player['team_id']]) ? $score[$player['team_id']] + 1 : 1;
                    }
                }
            }
            $game->score = $score;
            $game->players = $players;
        }

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'games' => $games,
        ]);
    }
}
