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

    public function index()
    {
        (new Tache)->cancelUnassignedTasks();
        $taches = Tache::with(['project', 'assignments.user'])->orderBy('created_at', 'desc')->get(); 
        
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

    public function create()
    {
        $projects = Project::all();
        return Inertia::render('Tasks/Create', [
            'projects' => $projects
        ]);
    }

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

    public function edit($id)
    {
        $tache = Tache::find($id); 
        $projects = Project::all();

        if (!$tache) {
            return redirect()->route('tasks.index')->with('error', 'Task not found');
        }
        return Inertia::render('Tasks/Edit', [
            'tache' => $tache,
            'projects' => $projects
        ]);
    }

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

    public function destroy($id)
    {
        $tache = Tache::find($id);
        $tache->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}
