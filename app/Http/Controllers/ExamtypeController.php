<?php

namespace App\Http\Controllers;

class ExamtypeController extends Controller
{
    use Resource;

    protected $modelClass = 'App\Examtype';

    protected $credentials = [
        "fields"=>[
            'name',
            'questions'
        ],
        "relations"=>[
            'knows'
        ]
    ];
}
