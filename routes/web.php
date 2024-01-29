<?php

use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerGameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GoalController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [GameController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/game', [GameController::class, 'createForm'])->middleware(['auth', 'verified'])->name('game.create');
Route::get('/game/{id}', [GameController::class, 'show'])->middleware(['auth', 'verified'])->name('game.show');
Route::post('/game', [GameController::class, 'create'])->middleware(['auth', 'verified'])->name('game.create');
Route::post('/game/{id}', [GameController::class, 'delete'])->middleware(['auth', 'verified'])->name('game.delete');
Route::get('/game/{id}/editGame', [GameController::class, 'editGameForm'])->middleware(['auth', 'verified'])->name('game.edit');
Route::patch('/game/{id}/editGame', [GameController::class, 'editGame'])->middleware(['auth', 'verified'])->name('game.edit');

Route::post('/game/{id}/deleteGoal',[GoalController::class, 'destroy'])->middleware(['auth', 'verified'])->name('goal.destroy');
Route::post('/game/{id}/addGoal',[GoalController::class, 'create'])->middleware(['auth', 'verified'])->name('goal.create');

Route::post('/game/{id}/createTeam', [PlayerGameController::class, 'create'])->middleware(['auth', 'verified'])->name('playerGame.create');
Route::patch('/game/{id}/resetTeam', [PlayerGameController::class, 'reset'])->middleware(['auth', 'verified'])->name('playerGame.reset');
Route::patch('/game/{id}/changeTeam', [PlayerGameController::class, 'changeTeam'])->middleware(['auth', 'verified'])->name('playerGame.changeTeam');

Route::get('/players', [PlayerController::class, 'index'])->name('player.index');
Route::post('/players', [PlayerController::class, 'create'])->middleware(['auth', 'verified'])->name('player.create');
Route::get('/player/{id}', [PlayerController::class, 'show'])->middleware(['auth', 'verified'])->name('player.show');
Route::patch('/player/{id}', [PlayerController::class, 'update'])->middleware(['auth', 'verified'])->name('player.update');


require __DIR__.'/auth.php';
