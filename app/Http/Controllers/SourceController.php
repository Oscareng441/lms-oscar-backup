<?php

namespace App\Http\Controllers;

use App\Models\SourceReference;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Middleware\CheckEditorPermission;
use App\Helpers\OmniHelper;

class SourceController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware(CheckEditorPermission::class),
        ];
    }
    public function index(Request $request)
    {
        $sources = SourceReference::all();
 
        return Inertia::render('Sources/Index', ['sources' => $sources]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'source_date' => 'required|string|max:255',
            'source_name' => 'required|string|max:255',
            'active' => 'nullable|boolean',
        ]);

        $source = SourceReference::find($request->id);
        if ($source) {
            $source->update([
                'name' => $request->name,
                'author' => $request->author,
                'source_date' => $request->source_date,
                'source_name' => $request->source_name,
                'active' => $request->active || false,
            ]);
        } else {
            $source = SourceReference::create([
                'name' => $request->name,
                'author' => $request->author,
                'source_date' => $request->source_date,
                'source_name' => $request->source_name,
                'active' => $request->active || false,
            ]);
        }

        $source->save();

        return back()->with('success', $source);
    }
}
