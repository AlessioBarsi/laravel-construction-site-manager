<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    use HasFactory;

    protected $fillable = [
        'description',
        'problem',
        'critical',
        'problem_description',
        'solution',
        'image_path',
        'site'
    ];

    public function site()
    {
        return $this->belongsTo(ConstructionSite::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_is_on_sites');
    }
}
