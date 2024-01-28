<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function __construct(protected Player $player, protected Game $game)
    {
    }

    public function index()
    {
        $players = $this->player->with('goals', 'games')->orderBy('id', 'desc')->get();

        // Calculate average goals per game for each player.
        foreach ($players as $player) {
            $games = $player->games->count();
            $goals = $player->goals->count();
            $avg_goals = $games > 0 ? $goals / $games : 0;
            $player->avg_goals = $avg_goals;
        }

        return Inertia::render('Player/index',
            [
                'players' => $players,
            ]
        );
    }

    public function create(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'nick_name' => 'required',
        ]);

        $this->player->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'nick_name' => $request->nick_name,
        ]);

        $players = $this->player->orderBy('id', 'desc')->get();

        return Inertia::render('Player/index',
            [
                'players' => $players,
            ]);
    }

    public function store()
    {
        return Inertia::render('Player/store');
    }

    public function show($id)
    {
        $player = $this->player->with('goals', 'games')->where('id', $id)->firstOrFail();
        $gamesIds = [];
        foreach ($player->games as $game) {
            $gamesIds[] = $game->game_id;
        }
        $games = $this->game->whereIn('id', $gamesIds)->get();

        return Inertia::render('Player/show',
            [
                'player' => $player,
                'games' => $games,
            ]
        );
    }

    public function edit()
    {
        return Inertia::render('Player/edit');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'nick_name' => 'required',
        ]);

        $this->player->where('id', $id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'nick_name' => $request->nick_name,
        ]);

        return $this->show($id);
    }

    public function destroy()
    {
        return Inertia::render('Player/destroy');
    }
}
