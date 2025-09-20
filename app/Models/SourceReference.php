<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SourceReference extends Model
{
    protected $fillable = [
        'name',
        'author',
        'source_date',
        'source_name',
        'active',
    ];
}
