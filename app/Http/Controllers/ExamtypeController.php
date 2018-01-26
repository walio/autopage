<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class ExamtypeController extends BaseController
{
    use Resource;

    protected $credentials = [
        "fields"=>[
            'name',
            'questions'
        ],
        "relations"=>[
            'knows'
        ]
    ];

    protected $modelClass = 'App\Models\Examtype';

}
