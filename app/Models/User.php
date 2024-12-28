<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

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

    /**
     * Accessor to get the full name of the user (if necessary).
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->name} ({$this->role})";
    }

    /**
     * Check if the user has a specific role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    /**
     * Check if the user is a superuser.
     *
     * @return bool
     */
    public function isSuperuser()
    {
        return $this->is_superuser;
    }

    /**
     * Check if the user is active.
     *
     * @return bool
     */
    public function isActive()
    {
        return $this->status === 'active';
    }

    /**
     * Get all projects assigned to the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Get all tasks assigned to the user through assignments.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function tasks()
    {
        return $this->hasManyThrough(Tache::class, Assignment::class, 'user_id', 'id', 'id', 'task_id');
    }

    /**
     * Get the user's active projects.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function activeProjects()
    {
        return $this->projects()->where('status', 'in-progress')->get();
    }

    /**
     * Get the user's completed tasks.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function completedTasks()
    {
        return $this->tasks()->where('status', 'completed')->get();
    }

    /**
     * Get the user's overdue tasks.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function overdueTasks()
    {
        return $this->tasks()->where('end_date', '<', now())->where('status', '!=', 'completed')->get();
    }

    /**
     * Get the user's task completion percentage across all their tasks.
     *
     * @return float
     */
    public function taskCompletionPercentage()
    {
        $totalTasks = $this->tasks()->count();
        $completedTasks = $this->completedTasks()->count();

        return $totalTasks > 0 ? ($completedTasks / $totalTasks) * 100 : 0;
    }
}
