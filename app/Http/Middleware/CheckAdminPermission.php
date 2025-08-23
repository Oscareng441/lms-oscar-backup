<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdminPermission
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->isAdmin()) {
            return $next($request);
        }

        // Redirect or abort if no permission
        abort(403, 'Unauthorized action.');
    }
}

