<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Tache extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [ 
        'project_id',
        'name',
        'description',
        'status',
        'priority',
        'start_date',
        'end_date',
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
            'status' => 'string',  // Since it's an enum, we treat it as a string
            'priority' => 'string', // Priority is also an enum, cast as string
        ];
    }

    /**
     * Get the project that owns the task.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'task_id');
    }
    /**
     * Check if the task is completed.
     *
     * @return bool
     */
    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    /**
     * Check if the task is in-progress.
     *
     * @return bool
     */
    public function isInProgress()
    {
        return $this->status === 'in-progress';
    }

    /**
     * Check if the task is pending.
     *
     * @return bool
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the task is cancelled.
     *
     * @return bool
     */
    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    public function getCompletionPercentageAttribute()
    {
        // Get the total number of assignments related to the task
        $totalAssignments = $this->assignments->count();

        // Get the number of completed assignments
        $completedAssignments = $this->assignments->filter(function ($assignment) {
            return $assignment->status === 'completed';
        })->count();

        return $totalAssignments > 0 ? ($completedAssignments / $totalAssignments) * 100 : 0;
    }
    

    
    /**
     * Get the users assigned to the task.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function assignedUsers()
    {
        return $this->assignments->pluck('user');
    }



    public function cancelUnassignedTasks()
    {
        $tasks = Tache::where('end_date', '<', Carbon::now())
                    ->whereDoesntHave('assignments') 
                    ->get();
        foreach ($tasks as $task) {
            $task->update([
                'status' => 'cancelled',
            ]);
        }
    }

}
