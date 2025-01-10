<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Tache;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard with statistics and chart data.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $usersCount = User::count();
        $activeUsersCount = User::where('status', 'active')->count();
        $projectsCount = Project::count();
        $completedProjectsCount = Project::where('status', 'completed')->count();
        $tasksCount = Tache::count();
        $completedTasksCount = Tache::where('status', 'completed')->count();
        $inProgressTasksCount = Tache::where('status', 'in-progress')->count();
        $pendingTasksCount = Tache::where('status', 'pending')->count();
        $cancelledTasksCount = Tache::where('status', 'cancelled')->count();
        $overdueTasksCount = Tache::where('end_date', '<', Carbon::now())->where('status', '!=', 'completed')->count();

        $projectsByStatus = Project::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->count];
            });

        $tasksOverTime = Tache::selectRaw('MONTH(created_at) as month, count(*) as task_count')
            ->groupBy('month')
            ->whereYear('created_at', Carbon::now()->year) 
            ->get();

        $tasksStatusBreakdown = Tache::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->count];
            });

        $projectsOverTime = Project::selectRaw('MONTH(created_at) as month, count(*) as project_count')
            ->groupBy('month')
            ->whereYear('created_at', Carbon::now()->year)
            ->get();

        return Inertia::render('Dashboard', [
            'usersCount' => $usersCount,
            'activeUsersCount' => $activeUsersCount,
            'projectsCount' => $projectsCount,
            'completedProjectsCount' => $completedProjectsCount,
            'tasksCount' => $tasksCount,
            'completedTasksCount' => $completedTasksCount,
            'inProgressTasksCount' => $inProgressTasksCount,
            'overdueTasksCount' => $overdueTasksCount,
            'projectsByStatus' => $projectsByStatus,  
            'tasksOverTime' => $tasksOverTime,        
            'tasksStatusBreakdown' => $tasksStatusBreakdown,  
            'projectsOverTime' => $projectsOverTime,  
            'pendingTasksCount' => $pendingTasksCount,
            'cancelledTasksCount' => $cancelledTasksCount

        ]);
    }
}
