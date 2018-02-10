<?php

namespace App\Http\Controllers;

use App\Question as QuestionModel;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use Resource;

    protected $modelClass = 'App\Question';

    protected $credentials = [
        "fields"=>[
            'stem',
            'options',
            'answer',
            'digest',
            'difficulty'
        ],
        "relations"=>[
            'knows'
        ]
    ];

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $input = $request->only(['stem', 'options','answer','digest','difficulty_level']);
        $q = QuestionModel::create($input);
        array_map(function($id) use($q){
            $q->knows()->attach($id);
        },array_unique($request->knows));
        return response("题目修改成功",200);
    }
}
