<?php

namespace App\Http\Controllers\Exam;

use App\Question as QuestionModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $results = $request->input("results")?:20;
        $sortField = $request->input("sortField")?:"id";
        $sortOrder = $request->input("sortOrder")?:"asc";
//        var_dump($sortField);
        $ret = QuestionModel::orderBy($sortField,$sortOrder)->paginate($results);
        $input = $request->only(["results","sortField","sortOrder","fields"]);
        $ret->appends($input);
        return $ret;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $input = $request->intersect(['stem', 'options','answer','digest','difficulty_level']);
        $q = QuestionModel::create($input);
        array_map(function($id) use($q){
            $q->knows()->attach($id);
        },array_unique($request->knows));
        return response("题目修改成功",200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        $ret = QuestionModel::find($id);
        $fields = explode(',',$request->input('fields'));
        if(in_array("relatedKnows",$fields)){
            $ret->knows;
        }
        return $ret;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $q = QuestionModel::find($id);
        if(!$q) return response("问题未找到",400);
        $q->knows()->detach();
        array_map(function($id) use($q){
            $q->knows()->attach($id);
        },array_unique($request->knows));
        $input = $request->intersect(['stem', 'options','answer','digest','difficulty_level']);
        $q->update($input);
        return response("题目修改成功",200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
