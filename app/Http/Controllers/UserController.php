<?php

namespace App\Http\Controllers;

use App\Models\WPUser;

class UserController extends Controller
{
    public function index()
    {
        $users = WPUser::take(10)->get();
        return view('users.index', compact('users'));
    }
}
