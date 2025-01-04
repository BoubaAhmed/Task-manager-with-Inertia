<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Project;
use App\Models\Tache;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AssignmentController extends Controller
{

    public function __construct()
    {
        $this->middleware('ensureSuperuser')->except(['index', 'markAsCompleted', 'markAsCancelled', 'markAsProgressing']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $assignments = Assignment::with(['user', 'task'])->orderBy('created_at', 'desc')->get();
        $users = User::all();
        $tasks = Tache::all();
        $projects = Project::all();
        return Inertia::render('Assignments/Index', [
            'assignments' => $assignments,
            'users' => $users,
            'tasks' => $tasks,
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $users = User::all();
        $projects = Project::all();
        $tasks = Tache::whereNotIn('status', ['cancelled'])->get();

        return Inertia::render('Assignments/Create', [
            'users' => $users,
            'tasks' => $tasks,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'task_id' => 'required|exists:taches,id',
        ]);

        $task = Tache::find($request->task_id);

        if ($task->isCompleted()) {
            return redirect()->route('assignments.create')->with('error', 'Impossible d\'assigner un utilisateur à une tâche terminée.');
        }

        if (Assignment::isUserAssignedToSameTaskInProject(new Assignment($request->all()))) {
            return redirect()->route('assignments.create')->with('error', 'Ce membre est déjà assigné à cette tâche dans le projet.');
        }

        $project = $task->project;

        if ($project->status !== 'in-progress') {
            $project->update(['status' => 'in-progress']);
        }
        if ($task->status !== 'in-progress') {
            $task->update(['status' => 'in-progress']);
        }
        $request->merge(['assigned_date' => now()]);
        Assignment::create($request->all());

        return redirect()->route('assignments.index');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assignment  $assignment
     * @return \Inertia\Response
     */
    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignments/Show', [
            'assignment' => $assignment->load(['user', 'task']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Assignment  $assignment
     * @return \Inertia\Response
     */
    public function edit(Assignment $assignment)
    {
        $users = User::all();
        $tasks = Tache::all();

        return Inertia::render('Assignments/Edit', [
            'assignment' => $assignment->load(['user', 'task']),
            'users' => $users,
            'tasks' => $tasks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Assignment $assignment)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'task_id' => 'required|exists:taches,id',
            'status' => 'required|in:pending,in-progress,completed,cancelled',
            'assigned_date' => 'required|date',
        ]);

        $task = Tache::find($request->task_id);
        if ($task->isCompleted()) {
            return redirect()->back()->with('error', 'Impossible d\'assigner un utilisateur à une tâche terminée.');
        }
        if ($assignment->user_id != $request->user_id) {
            if (Assignment::isUserAssignedToSameTaskInProject(new Assignment($request->all()))) {
                return redirect()->back()->with('error', 'Ce membre est déjà assigné à cette tâche dans le projet.');
            }
        }
        $project = $task->project;
        if ($project->status !== 'in-progress') {
            $project->update(['status' => 'in-progress']);
        } 
        if ($task->status !== 'in-progress') {
            $task->update(['status' => 'in-progress']);
        }
        $assignment->update($validated);
        return redirect()->route('assignments.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assignment  $assignment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return redirect()->route('assignments.index');
    }

    private function updateAssignmentStatus(Request $request, Assignment $assignment, $status, $message)
    {
        if ($assignment->user_id !== $request->user()->id) {
            return redirect()->back()->with('error', "Vous n'avez pas la permission de mettre cette tache $status.");
        }
        $assignment->update(['status' => $status]);
        $assignment->checkAndUpdateTaskStatus($assignment->task);
        return redirect()->back()->with('success', "Assignment marked as $message");
    }

    public function markAsCompleted(Request $request, Assignment $assignment)
    {
        return $this->updateAssignmentStatus($request, $assignment, 'completed', 'Completed');
    }

    public function markAsCancelled(Request $request, Assignment $assignment)
    {
        return $this->updateAssignmentStatus($request, $assignment, 'cancelled', 'Cancelled');
    }

    public function markAsProgressing(Request $request, Assignment $assignment)
    {
        return $this->updateAssignmentStatus($request, $assignment, 'in-progress', 'Progressing');
    }
}
