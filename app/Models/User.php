<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends  Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, \Illuminate\Auth\Passwords\CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'role',
        'status',
        'is_superuser',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_superuser' => 'boolean',
            'status' => 'string',
        ];
    }


    public function getFullNameAttribute()
    {
        return "{$this->name} ({$this->role})";
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function isSuperuser()
    {
        return $this->is_superuser;
    }

    public function isActive()
    {
        return $this->status === 'active';
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function tasks()
    {
        return $this->hasManyThrough(Tache::class, Assignment::class, 'user_id', 'id', 'id', 'task_id');
    }

    public function activeProjects()
    {
        return $this->projects()->where('status', 'in-progress')->get();
    }

    public function completedTasks()
    {
        return $this->tasks()->where('status', 'completed')->get();
    }

    public function overdueTasks()
    {
        return $this->tasks()->where('end_date', '<', now())->where('status', '!=', 'completed')->get();
    }

    public function taskCompletionPercentage()
    {
        $totalTasks = $this->tasks()->count();
        $completedTasks = $this->completedTasks()->count();

        return $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;
    }
}
