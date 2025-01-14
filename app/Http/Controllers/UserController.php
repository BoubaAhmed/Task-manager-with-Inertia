<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use \Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('ensureSuperuser')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        if ($request->user()->is_superuser) {
            $users = User::orderBy('created_at', 'desc')->get();
        } else {
            $users = User::where('is_superuser', false)->orderBy('created_at', 'desc')->get();
        }
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]); 
    }

    public function create() 
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:15',
            'role' => 'required|string|in:designer,developer,tester,manager,analyst',
            'status' => 'required|string|in:active,inactive,pending,suspended',
            'is_superuser' => 'required|boolean',
        ]);
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'role' => $validated['role'],
            'status' => $validated['status'],
            'is_superuser' => $validated['is_superuser'],
        ]);
        return redirect()->route('users.index')->with('success', 'User created successfully!');
    }

    public function show(Request $request, $id)
    {
        try {
            if (!$request->user()->is_superuser) {
                $user = User::where('is_superuser', false)
                            ->with(['projects', 'tasks'])
                            ->findOrFail($id);
            } else {
                $user = User::with(['projects', 'tasks'])->findOrFail($id);
            }
            return Inertia::render('Users/Show', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'role' => $user->role,
                    'status' => $user->status,
                    'is_superuser' => $user->is_superuser,
                    'projects' => $user->projects,
                    'tasks' => $user->tasks,
                ],
            ]);
        } catch (ModelNotFoundException $e) {
            return redirect()->route('users.index')->with('error', 'Utilisateur introuvable ou accès refusé.');
        }
    }
    

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:15', 
            'role' => 'required|string|in:designer,developer,tester,manager,analyst', 
            'status' => 'required|string|in:active,inactive,pending,suspended', 
            'is_superuser' => 'required|boolean',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'] ?? $user->phone_number, 
            'role' => $validated['role'],
            'status' => $validated['status'],
            'is_superuser' => $validated['is_superuser'],
        ]);

        if ($request->has('password') && $request->password) {
            $user->update(['password' => bcrypt($validated['password'])]);
        }

        return redirect()->route('users.index')->with('message', 'User updated successfully!');
    }


    public function destroy(User $user)
    {
        if ($user->is_superuser) {
            return redirect()->route('users.index')->with('error', 'Impossible de supprimer un admin.');
        }    
        $user->delete();
        return redirect()->route('users.index')->with('message', 'Utilisateur supprimé avec succès.');
    }
    
}
