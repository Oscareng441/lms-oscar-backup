<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\School;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Middleware\CheckAdminPermission;

class SchoolController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware(CheckAdminPermission::class),
        ];
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $schools = School::all();
 
        return Inertia::render('Schools/Index', ['schools' => $schools]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'active' => 'nullable|boolean',
        ]);

        $school = School::find($request->id);
        if ($school) {
            $school->update([
                'name' => $request->name,
                'active' => $request->active || false,
            ]);
        } else {
            $school = School::create([
                'name' => $request->name,
                'active' => $request->active || false,
            ]);
        }

        $school->save();

        if ($request->students) {
            $school->saveStudents($request->students);
        }
        if ($request->teachers) {
            $school->saveTeachers($request->teachers);
        }

        return back()->with('success', $school);
    }

    public function users(Request $request, $id)
    {
        $user = $request->user();
        $school = School::find($id);
        // $students = $school->allStudents();
        // $teachers = $school->allTeachers();
        $students = $school->allUsers();
        $teachers = $school->allUsers("teacher");

        return Inertia::render('Schools/Users', ['school' => $school, 'allStudents' => $students, 'teachersThisGroup' => $teachers]);
    }

    public function destroy(Request $request, $id): RedirectResponse
    {
        $school = School::find($id);
        $school->delete();

        return Redirect::to('school.index');
    }
}
