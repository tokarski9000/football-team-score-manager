<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerGame;
use Illuminate\Http\Request;

class PlayerGameController extends Controller
{
    public function __construct(protected PlayerGame $playerGame, protected Player $player, protected Game $game)
    {
    }

    public function create(Request $request)
    {
        // Get players ids from request.
        $player_ids = [];
        foreach ($request->players as $player) {
            $player_ids[] = $player['id'];
        }
        $players = $this->player->whereIn('id', $player_ids)->with('goals', 'games')->orderBy('id', 'desc')->get();

        // Calculate average goals per game for each player.
        foreach ($players as $player) {
            $avg_goals = $player->goals->count() / $player->games->count();
            $player->avg_goals = $avg_goals;
        }
        // Sort players by average goals per game.
        $players = $players->sortByDesc('avg_goals');

        // Get playerGame records for this game.
        $playerGames = $this->playerGame->where('game_id', $request->game_id)->get();
        // Assign players to teams.
        $i = 1;
        foreach ($playerGames as $player) {
            $this->playerGame->where('id', $player->id)->update(['team_id' => $i % 2 == 0 ? 2 : 1]);
            $i++;
        }

        return redirect()->route('game.show', ['id' => $request->game_id]);
    }
}
