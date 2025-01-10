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
            'status' => 'string',  
            'priority' => 'string', 
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
        $totalAssignments = $this->assignments->count();

        $completedAssignments = $this->assignments->filter(function ($assignment) {
            return $assignment->status === 'completed';
        })->count();

        return $totalAssignments > 0 ? ($completedAssignments / $totalAssignments) * 100 : 0;
    }
    

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
