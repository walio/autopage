<?php
namespace App\Http\Controllers;

use App\Models\Examtype;
use App\Models\Know;
use App\Models\Paper;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller as BaseController;
class PaperController extends BaseController
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

    protected $modelClass = 'App\Models\Paper';

    public function store(Request $request)
    {
        $examtype = Examtype::find($request->input('examtype'));
        $ratio = $request->input('knows')?:$examtype->knows->all();
        // todo: turn ratio to distribution
        $questions = PaperUtils::questions($ratio, $request->input('selectRare')?:false);
        $paper = Paper::create([
            'name'=>$request->input('name'),
            'questions'=>json_encode($questions),
            'user_id'=>Auth::id(),
            'user_name'=>User::find(Auth::id())->name,
            'examtype_id'=>$examtype?$examtype->id:null,
            'examtype_name'=>$examtype?$examtype->name:null,
        ]);
        return $paper;
    }

    public function show($id) {
        $model = $this->findOrFail($id)->toArray();
        foreach ($model['questions'] as $index=>$questionId){
            $model['questions'][$index] = Question::find($questionId);
        }
        return $model;
    }
}