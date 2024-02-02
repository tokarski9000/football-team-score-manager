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
        $validate = $request->validate([
            'dateTime' => ['required', 'date'],
            'place' => 'required',
            'players' => ['required', 'min:2']
        ]);

        $game = $this->game->create([
            'date_time' => $request->dateTime,
            'place' => $request->place,
        ]);

        foreach ($request->players as $player) {
            $this->playerGame->create([
                'player_id' => $player,
                'game_id' => $game->id,
                'team_id' => null
            ]);
        }

        return redirect()->route('game.show', ['id' => '1']);
    }

    public function createForm()
    {
        $players = $this->player->get();

        return Inertia::render('Game/create',
            [
                'players' => $players,
            ]);
    }

    public function index()
    {
        $games = $this->game->with('playerGames.player', 'goals', 'teams')->orderByDesc('id')->get();
        // Map necessary information to the games.
        foreach ($games as $game) {
            $game = self::getPlayers($game);
        }

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'games' => $games,
        ]);
    }

    public function show($id) {

        $game = $this->game->with('playerGames.player', 'goals', 'teams')->where('id', $id)->first();

        if ($game) {
            $game = self::getPlayers($game);
        }

        return Inertia::render('Game/show',
            [
                'game' => $game,
            ]);
    }

    public function delete($id) {
        Game::find($id)->delete();

        return redirect()->route('home');
    }

    public function editGameForm($id) {

        return Inertia::render('Game/edit', [
            'game' => $this->game->where('id', $id)->with('players')->first(),
            'players' => $this->player->get()
        ]);
    }

    public function editGame(Request $request, $id) {
        $validate = $request->validate([
            'players' => ['required', 'min:2']
        ]);

        // Get players ids from request.
        $playersIds = [];
        foreach ($request->players as $player_id) {
            $playersIds[] = $player_id;
        }

        // Remove players that are not in the request and get the players that are in the request but not in the database.
        $playerGames = $this->playerGame->where('game_id', $id)->get();
        $playerGames_player_ids = [];
        foreach ($playerGames as $playerGame) {
            $playerGames_player_ids[] = $playerGame->player_id;
            if (!in_array($playerGame->player_id, $playersIds)) {
                $this->playerGame->where('id', $playerGame->id)->delete();
            }
        }

        // Add players that are in the request, but not in the database.
        $newPlayers = array_diff($playersIds, $playerGames_player_ids);
        foreach ($newPlayers as $newPlayer) {
            $this->playerGame->create([
                'player_id' => $newPlayer,
                'game_id' => $id,
                'team_id' => null
            ]);
        }

        return $this->show($id);
    }

    private function getPlayers($game) {

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

        return $game;
    }
}
