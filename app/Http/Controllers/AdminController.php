<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\StudentGroup;
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
        $roles = [];
        foreach(Role::all() as $r) {
            $roles[$r['role']] = ['key'=>$r['id'], 'value'=>$r['id'], 'label'=>$r['role']];
        }

        $userRoles = [];
        if ($user) {
            foreach ($user->roles()->get() as $r) {
                $userRoles[] = $roles[$r['role']];
            }
        }
 
        return Inertia::render('Users/Edit', ['user' => $user, 'userRoles' => $userRoles, 'roles' => array_values($roles)]);
    }

    public function groups(Request $request)
    {
        $user = $request->user();
        $groups = StudentGroup::getAll();
 
        return Inertia::render('Groups/All', ['groups' => $groups]);
    }

    public function userSave(Request $request) : RedirectResponse
    {
        $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'roles' => 'array',
            'active' => 'nullable|boolean',
        ]);

        $user = User::find($request->id);
        if ($user) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'active' => $request->active || false,
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'active' => $request->active || false,
                'password' => bcrypt('x'),
            ]);
        }

        $roleIds = [];
        foreach($request->roles as $r) {
            $roleIds[] = $r['value'];
        }
        $user->roles()->detach();
        $user->roles()->attach($roleIds);

        $user->save();
        
        return redirect()->route('admin.users');
    }
}
