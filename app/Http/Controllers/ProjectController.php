<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware('ensureSuperuser')->except('index');
    }

    public function index()
    {
        $projects = Project::with(['user', 'tasks'])->orderBy('created_at', 'desc')->get();
        $projects->transform(function ($project) {
            $project->completion_percentage = $project->getCompletionPercentageAttribute();
            return $project;
        });
    
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        $users = User::where('is_superuser', true)->get();
        return Inertia::render('Projects/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => [
                'required', 
                'date', 
                'after:today',
                'before:end_date',
            ],
            'end_date' => [
                'required', 
                'date', 
                'after:today', 
                'after:start_date'
            ],
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'required|in:pending,completed,cancelled,in-progress',
            'user_id' => 'required|exists:users,id',
        ]);
        
        Project::create($request->all());
        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        $users = User::where('is_superuser', true)->get();
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => [
                'required', 
                'date', 
                'after:today',
                'before:end_date',
            ],
            'end_date' => [
                'required', 
                'date', 
                'after:today', 
                'after:start_date'
            ],
            'priority' => 'nullable|in:low,medium,high',
            'status' => 'required|in:pending,completed,cancelled,in-progress',
            'user_id' => 'required|exists:users,id',
        ]);

        $project->update($request->all());
        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
 