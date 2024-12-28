<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TacheController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



// Route::get('/projects', function () {
//     return Inertia::render('Test');
// })->middleware(['auth', 'verified'])->name('projects');
 


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/tasks', [ProfileController::class, 'tasks'])->name('mytasks');


    Route::resource('projects', ProjectController::class)->names('projects');
    Route::resource('tasks', TacheController::class)->names('tasks');
    Route::resource('assignments', AssignmentController::class)->names('assignments');
    Route::patch('/assignments/{assignment}/complete', [AssignmentController::class, 'markAsCompleted'])->name('assignments.complete');

    Route::resource('users', UserController::class)->names('users');
});

require __DIR__.'/auth.php';