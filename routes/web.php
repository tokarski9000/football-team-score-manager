<?php

use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/players', [PlayerController::class, 'index'])->middleware(['auth', 'verified'])->name('player.index');
Route::post('/players', [PlayerController::class, 'create'])->middleware(['auth', 'verified'])->name('player.create');

require __DIR__.'/auth.php';
