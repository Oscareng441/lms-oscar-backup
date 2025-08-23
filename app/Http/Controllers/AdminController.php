<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Middleware\CheckAdminPermission;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(CheckAdminPermission::class),
        ];
    }

    public function users(Request $request)
    {
        $user = $request->user();
        $users = User::getForUsersView();
 
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function userEdit(Request $request, $id)
    {
        $user = User::find($id);
 
        return Inertia::render('Users/Edit', ['user' => $user]);
    }

    public function userSave(Request $request) : RedirectResponse
    {
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);

        $user = User::find($request->id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        
        return redirect()->route(
            'admin.users', []
        );
    }
}
