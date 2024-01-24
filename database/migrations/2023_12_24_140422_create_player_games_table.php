<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('player_games', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('player_id')->constrained();
            $table->foreignId('game_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->nullable()->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_games');
    }
};
