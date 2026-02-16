<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAction extends Model
{
    protected $table = 'user_actions';

    protected $fillable = [
        'email',
        'action_desc',
        'action_date',
    ];
}
