<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::table('players', function (Blueprint $table) {
        $table->string('nick_name', 100)->nullable()->change();
      });

      Schema::table('games', function (Blueprint $table) {
        $table->datetime('date')->change();
        $table->renameColumn('date', 'date_time');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::table('players', function (Blueprint $table) {
        $table->string('nick_name', 100)->change();
      });

      Schema::table('games', function (Blueprint $table) {
        $table->renameColumn('date_time', 'date');
        $table->date('date')->change();
      });
    }
};
