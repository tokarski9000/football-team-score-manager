<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    public function __construct(protected Player $player)
    {
    }

    public function index()
    {
        $players = $this->player->orderBy('id', 'desc')->get();

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

    public function show()
    {
        return Inertia::render('Player/show');
    }

    public function edit()
    {
        return Inertia::render('Player/edit');
    }

    public function update()
    {
        return Inertia::render('Player/update');
    }

    public function destroy()
    {
        return Inertia::render('Player/destroy');
    }
}
