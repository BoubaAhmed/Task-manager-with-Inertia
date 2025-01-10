<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'priority',
        'status',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'priority' => 'string',
            'status' => 'string',  
        ];
    }

    /**
     * Get the user that owns the project.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Tache::class);
    }

    
    public function getFullProjectNameAttribute()
    {
        return "{$this->name} ({$this->priority} priority)";
    }

 
    public function isCompleted()
    {
        return $this->status === 'completed';
    }


    public function isInProgress()
    {
        return $this->status === 'in-progress';
    }


    public function isPending()
    {
        return $this->status === 'pending';
    }


    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    public function getCompletionPercentageAttribute()
    {
        $totalTasks = $this->tasks->count();
        
        if ($totalTasks == 0) {
            return 0;
        }
    
        $totalProgress = $this->tasks->sum(function ($task) {
            return $task->getCompletionPercentageAttribute(); 
        });
    
        $averageProgress = $totalProgress / $totalTasks;
    
        return $averageProgress;
    }
    

    public function hasOverdueTasks()
    {
        return $this->tasks->where('end_date', '<', now())->where('status', '!=', 'completed')->isNotEmpty();
    }

    public function activeTasks()
    {
        return $this->tasks->whereIn('status', ['in-progress', 'pending']);
    }
}
