<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['filename', 'report_id', 'media_type'];

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }
}
