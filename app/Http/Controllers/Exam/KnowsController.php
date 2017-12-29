<?php

namespace App\Http\Controllers\Exam;

use App\Knows as KnowsModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KnowsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->show(0);
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
        $p = $request->input('parent_id');
        $c = $request->input('subjectContent');
        $l = $request->input('level');
        $parent = KnowsModel::find($p);
        if (!$parent){
            return response("父节点不存在",400);
        }
        if ($l!=$parent->level+1){
            return response("请求添加知识点层次有误",400);
        }
        $test = KnowsModel::firstOrCreate(['parent_id'=>$p,'content'=>$c,'level'=>$l]);
        if($test->wasRecentlyCreated){
            return response("知识点添加成功",200);
        }else{
            return response("知识点已存在，请勿重复添加",400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $row = KnowsModel::find($id);
        $row || $row = KnowsModel::where("content","root")->first();
        $row->child_knows;
        return $row;

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
        $know = KnowsModel::find($id);
        if(!$know){
            return response("知识点不存在",400);
        }elseif($know->content!=$request->input("originalContent")){
            return response("原知识点校验错误",400);
        }else{
            $know->content = $request->input("modifiedContent");
            $know->save();
            return response("知识点修改成功",200);
        }
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
        if(KnowsModel::exists("parent_id",$id)){
            return response("请先删除知识点下所有子知识节点", 400);
        }elseif (KnowsModel::find($id)->questions){
            return response("请先删除知识点相关的所有题目", 400);
        }else{
            KnowsModel::destroy($id);
            return response("删除成功", 200);
        }
    }
}
