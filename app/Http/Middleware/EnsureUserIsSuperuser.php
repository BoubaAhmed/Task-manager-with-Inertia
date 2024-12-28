<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsSuperuser
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->is_superuser) {
            return redirect()->back()->with('error', 'Vous n\'avez pas la permission d\'accéder à cette page.');
        }
        return $next($request);
    }
}
