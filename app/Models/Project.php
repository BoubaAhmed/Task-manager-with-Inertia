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
            'status' => 'string',  // Since it's an enum, you can keep it as a string
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
    /**
     * Get the full name of the project (for display purposes).
     *
     * @return string
     */
    public function getFullProjectNameAttribute()
    {
        return "{$this->name} ({$this->priority} priority)";
    }

    /**
     * Check if the project is completed.
     *
     * @return bool
     */
    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    /**
     * Check if the project is in-progress.
     *
     * @return bool
     */ 
    public function isInProgress()
    {
        return $this->status === 'in-progress';
    }

    /**
     * Check if the project is pending.
     *
     * @return bool
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the project is cancelled.
     *
     * @return bool
     */
    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    // public function getCompletionPercentageAttribute()
    // {
    //     $totalTasks = $this->tasks->count();
        
    //     if ($totalTasks == 0) {
    //         return 0;
    //     }

    //     $completedTasks = $this->tasks->where('status', 'completed')->count();
    //     $inProgressTasks = $this->tasks->where('status', 'in-progress')->count();
    //     $pendingTasks = $this->tasks->where('status', 'pending')->count();
    //     $cancelledTasks = $this->tasks->where('status', 'cancelled')->count();
        
    //     if ($completedTasks == $totalTasks) {
    //         return 100;
    //     }
        
    //     if ($cancelledTasks == $totalTasks || $pendingTasks == $totalTasks) {
    //         return 0;
    //     }
    //     $completedAndInProgressTasks = $completedTasks + $inProgressTasks;
    //     $completionPercentage = ($completedAndInProgressTasks / $totalTasks) * 100;

    //     return $completionPercentage;
    // }
    public function getCompletionPercentageAttribute()
    {
        $totalTasks = $this->tasks->count();
        
        // If there are no tasks, return 0%
        if ($totalTasks == 0) {
            return 0;
        }
    
        // Calculate the sum of the completion percentages of all tasks
        $totalProgress = $this->tasks->sum(function ($task) {
            return $task->getCompletionPercentageAttribute(); // Call the method to get completion percentage of each task
        });
    
        // Calculate the average completion percentage
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
