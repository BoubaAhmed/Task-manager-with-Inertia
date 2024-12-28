<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'task_id',
        'assigned_date',
        'status'
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'assigned_date' => 'date',
            'status'=>'string',
        ];
    }

    /**
     * Get the user that owns the assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the task that is assigned to the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function task()
    {
        return $this->belongsTo(Tache::class, 'task_id');
    }

    public function markAsCompleted()
    {
        $this->status = 'completed';
        $this->save();
        $this->checkAndUpdateTaskStatus($this->task);

        return true;
    }

    private function checkAndUpdateTaskStatus($task)
    {
        $completedAssignmentsCount = Assignment::where('task_id', $task->id)
            ->where('status', 'completed')
            ->count();

        $totalAssignmentsCount = Assignment::where('task_id', $task->id)->count();

        if ($completedAssignmentsCount === $totalAssignmentsCount) {
            $task->update(['status' => 'completed']);
        }
    }


    /**
     * Check if the user is already assigned to the task in the same project.
     *
     * @param \App\Models\Assignment $assignment
     * @return bool
     */
    public static function isUserAssignedToSameTaskInProject(Assignment $assignment)
    {
        return self::where('user_id', $assignment->user_id)
                    ->where('task_id', $assignment->task_id)
                    ->whereHas('task', function ($query) use ($assignment) {
                        $query->where('project_id', $assignment->task->project_id);
                    })->exists();
    }

}