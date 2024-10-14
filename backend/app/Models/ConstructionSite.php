<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConstructionSite extends Model
{

    use HasFactory;
    protected $fillable = [
        'title',
        'client',
        'location',
        'start_date',
        'end_date',
        'status',
        'director'
    ];

    public function director()
    {
        return $this->belongsTo(User::Class);
    }

    public function reports()
    {
        return $this->hasMany(Report::Class);
    }
}
