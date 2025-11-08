<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckEditorPermission
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user && ($user->isAdmin() || $user->isTeacher())) {
            return $next($request);
        }

        abort(403, 'Unauthorized action.');
    }
}

