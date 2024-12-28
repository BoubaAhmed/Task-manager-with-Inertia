<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;


class TacheController extends Controller
{

    public function __construct()
    {
        $this->middleware('ensureSuperuser')->except('index');
    }

    /**
     * Display a listing of tasks.
     */
    public function index()
    {
        (new Tache)->cancelUnassignedTasks();
        $taches = Tache::with(['project', 'assignments.user'])->get(); 
        
        $taches = $taches->map(function ($tache) {
            $tache->completion_percentage = $tache->getCompletionPercentageAttribute();
            return $tache;
        });
        $projects = Project::all(); 
        return Inertia::render('Tasks/Index', [
            'taches' => $taches,
            'projects'=>$projects
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create()
    {
        $projects = Project::all(); // Get all projects to display in the dropdown
        return Inertia::render('Tasks/Create', [
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed,cancelled,in-progress',
            'priority' => 'nullable|in:low,medium,high',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        Tache::create($validated); 
        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Show the form for editing the specified task.
     */
    // public function edit(Tache $tache)
    // {
    //     $projects = Project::all(); // Get all projects for the dropdown
    //     return Inertia::render('Tasks/Edit', [
    //         'tache' => $tache,
    //         'projects' => $projects
    //     ]);
    // }
    public function edit($id)
    {
        $tache = Tache::find($id); // Find the task by its ID
        $projects = Project::all(); // Get all projects

        if (!$tache) {
            return redirect()->route('tasks.index')->with('error', 'Task not found');
        }

        return Inertia::render('Tasks/Edit', [
            'tache' => $tache,
            'projects' => $projects
        ]);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, $id)
    {
        $tache = Tache::find($id);
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed,cancelled,in-progress',
            'priority' => 'nullable|in:low,medium,high',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $tache->update($validated); 

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy($id)
    {
        $tache = Tache::find($id);
        $tache->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}
