<?php

namespace App\Http\Controllers;

use App\Models\SourceReference;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
// use Illuminate\Routing\Controllers\Middleware;
// use App\Http\Middleware\CheckEditorPermission;
use App\Helpers\OmniHelper;
use App\Models\Course;

class SearchController extends Controller // implements HasMiddleware
{
    // public static function middleware(): array
    // {
    //     return [
    //         new Middleware(CheckEditorPermission::class),
    //     ];
    // }

    public function searchAll(Request $request)
    {
        return Inertia::render('Search', []);
    }

    public function performSearch(Request $request, $srch): array
    {
        $results = Course::getSearchResults($srch);

        return ['data' => $results];
    }

}
