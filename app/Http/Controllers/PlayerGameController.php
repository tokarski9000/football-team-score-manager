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

    public function create(Request $request, $id)
    {
        $request->validate([
            'players' => ['required', 'min:4']
        ]);

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

        // Assign players to teams.
        $turn = 2;
        $i = 1;
        foreach ($players as $player) {
            if($i === 0) {
                $this->playerGame->where(['player_id'=>$player->id, 'game_id'=>$id])->update(['team_id' => 1]);
            }

            if ($i % 2 === 0) {
                $this->playerGame->where(['player_id'=>$player->id, 'game_id'=>$id])->update(['team_id' => $turn]);
            } else {
                $this->playerGame->where(['player_id'=>$player->id, 'game_id'=>$id])->update(['team_id' => $turn]);
                $turn = $turn === 1 ? 2 : 1;
            }
            $i++;
        }

        return redirect()->route('game.show', ['id' => $id]);
    }

    public function reset($id)
    {
        $playerGames = $this->playerGame->where('game_id', $id)->get();
        foreach ($playerGames as $player) {
            $this->playerGame->where('id', $player->id)->update(['team_id' => null]);
        }

        return redirect()->route('game.show', ['id' => $id]);
    }

    public function changeTeam(Request $request, $id)
    {
        $player = $this->playerGame->where(['player_id'=>$request->player_id, 'game_id'=>$id])->first();
        $team = $player->team_id == 1 ? 2 : 1;
        $this->playerGame->where(['player_id'=>$request->player_id, 'game_id'=>$id])->update(['team_id' => $team]);

        return redirect()->route('game.show', ['id' => $id]);
    }
}
