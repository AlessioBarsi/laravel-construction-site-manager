<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    use HasFactory;

    protected $fillable = [
        'sending_date',
        'sending_check',
        'site'
    ];

    public function site()
    {
        return $this->belongsTo(ConstructionSite::class);
    }

    public function report_lines()
    {
        return $this->hasMany(ReportLine::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_is_on_sites');
    }
}
