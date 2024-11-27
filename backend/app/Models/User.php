<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'site',
        'admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function constructionSite() {
         return $this->belongsTo(ConstructionSite::class, 'site'); // Specify 'site' as the foreign key }
    }

    public function directors()
    {
        return $this->hasMany(ConstructionSite::class);
    }

    public function authors()
    {
        return $this->hasMany(ReportLine::class);
    }

    public function reports()
    {
        return $this->belongsToMany(User::class, 'user_is_on_sites');
    }
}
