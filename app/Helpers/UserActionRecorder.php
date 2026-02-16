<?php

namespace App\Helpers;

use App\Models\UserAction;

class UserActionRecorder
{
    public static function record($email, $actionDescr)
    {
        UserAction::create([
            'email' => $email,
            'action_desc' => $actionDescr,
            'action_date' => date('Y-m-d H:i:s'),
        ]);
    }
}
