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
        for($i = 0; $i < count($players); $i++) {
            if ($i === 0) {
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 1]);
                $turn = 2;
                continue;
            }
            if($i+1 === count($players)) {
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 2]);
                break;
            }

            if ($turn === 2) {
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 2]);
                $i++;
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 2]);
                $turn = 1;
            } else {
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 1]);
                $i++;
                $this->playerGame->where(['player_id'=>$players[$i]->id, 'game_id'=>$id])->update(['team_id' => 1]);
                $turn = 2;
            }
        }

        return redirect()->route('game.show', ['id' => $id]);
    }

    public function reset(Request $request, $id)
    {
        $playerGames = $this->playerGame->where('game_id', $id)->get();
        foreach ($playerGames as $player) {
            $this->playerGame->where('id', $player->id)->update(['team_id' => null]);
        }

        return redirect()->route('game.show', ['id' => $id]);
    }
}
