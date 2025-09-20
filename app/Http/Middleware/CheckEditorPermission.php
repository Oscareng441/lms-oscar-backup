<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckEditorPermission
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->isTeacher()) {
            return $next($request);
        }

        // Redirect or abort if no permission
        abort(403, 'Unauthorized action.');
    }
}

