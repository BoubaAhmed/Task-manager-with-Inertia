<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Project;
use App\Models\Tache;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $assignments = Assignment::with(['user', 'task'])->get();
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
        $tasks = Tache::whereNotIn('status', ['cancelled', 'completed'])->get();

        return Inertia::render('Assignments/Create', [
            'users' => $users,
            'tasks' => $tasks,
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
            return redirect()->route('assignments.create')->withErrors('Cannot assign user to a completed task.');
        }

        if (Assignment::isUserAssignedToSameTaskInProject(new Assignment($request->all()))) {
            return redirect()->route('assignments.create')->withErrors('User is already assigned to this task in the project.');
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
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'task_id' => 'required|exists:taches,id',
            'assigned_date' => 'required|date',
        ]);

        $assignment->update($request->all());

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

    public function markAsCompleted(Request $request, Assignment $assignment)
    {
        if ($assignment->user_id !== $request->user()->id) {
            return redirect()->back()->with('error', 'Vous n\'avez pas la permission de mettre cette tache complete.');
        }
        $assignment->markAsCompleted();
        return redirect()->route('assignments.index')->with('success', 'Assignment marked as completed');
    }

}
