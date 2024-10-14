<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportLine extends Model
{

    use HasFactory;

    protected $fillable = [
        'line',
        'image',
        'problem',
        'report',
        'author',
    ];

    public function report()
    {
       return $this->belongsTo(Report::Class);
    }

    public function author()
    {
        return $this->belongsTo(User::Class);
    }
}
