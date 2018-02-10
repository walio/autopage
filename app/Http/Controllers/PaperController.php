<?php
namespace App\Http\Controllers;

use App\Examtype;
use App\Paper;
use App\Question;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaperController extends Controller
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


    /**
     * 用户存储库的实现。
     *
     * @var Paper
     */

    protected $model;

    public function _construct(Paper $paper) {
        $this->model = $paper;
    }
    protected $modelClass = 'App\Paper';

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

    public function show(Paper $paper) {
        $model = $paper->toArray();
        // todo : do it in a single sql
        foreach ($model['questions'] as $index=>$questionId){
            $q =  Question::find($questionId)->toArray();
            foreach ($q['options'] as $optionIndex=>$option){
                $q['options'][$optionIndex] = ['letter'=>chr($optionIndex+65),'text'=>$option];
            }
            $q['number'] = $index+1;
            $model['questions'][$index] = $q;
        }
        return $model;
    }
}