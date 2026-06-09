<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\QueryTracker;

class LogPerformanceMetrics
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!app()->environment('local')) {
            return $next($request);
        }

        // Skip static/asset requests to reduce log noise
        if ($this->isStaticRequest($request)) {
            return $next($request);
        }

        QueryTracker::start();

        $response = $next($request);

        // Log metrics only for successful HTML/Inertia responses
        if (!$this->isStaticRequest($request) &&
            $response->getStatusCode() === 200 &&
            $this->shouldLogRequest($request)) {
            
            $label = "{$request->method()} {$request->path()}";
            QueryTracker::log($label);
        }

        return $response;
    }

    private function isStaticRequest(Request $request): bool
    {
        $path = $request->path();
        
        // Skip static/asset paths
        return str_starts_with($path, 'api/') ||
               str_starts_with($path, 'storage/') ||
               str_starts_with($path, 'build/') ||
               str_starts_with($path, 'vite') ||
               str_ends_with($path, 'favicon.ico') ||
               str_ends_with($path, '.js') ||
               str_ends_with($path, '.css') ||
               str_ends_with($path, '.png') ||
               str_ends_with($path, '.jpg') ||
               str_ends_with($path, '.gif');
    }

    private function shouldLogRequest(Request $request): bool
    {
        // Log web requests that are likely Inertia (not AJAX, not API)
        $isAjax = $request->expectsJson() || $request->header('X-Requested-With') === 'XMLHttpRequest';
        return !$isAjax && $request->path() !== 'api';
    }
}
