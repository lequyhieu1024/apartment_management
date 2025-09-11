<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Building extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'address', 'description', 'owner_user_id', 'code'
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

}
