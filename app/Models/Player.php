<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'nick_name',
    ];

    /**
     * The users that belong to the role.
     */
    public function games(): HasMany
    {
        return $this->hasMany(PlayerGame::class);
    }

    public function goals()
    {
        return $this->hasMany(Goal::class);
    }
}
