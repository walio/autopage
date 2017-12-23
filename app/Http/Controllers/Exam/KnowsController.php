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
        var_dump(123);
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
        $parent = KnowsModel::find($p);
        if (!$parent){
            return response("父节点不存在",400);
        }
        if(KnowsModel::where(["parent_id"=>$p,"content"=>$c])->count()<=0){
            if ($request->input('level')!=$parent->level+1){

                return response("请求添加知识点层次有误",400);
            }
            $know = new KnowsModel;
            $know->parent_id = $p;
            $know->content = $c;
            $know->level = $parent->level+1;
            $know->save();
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
        $level = $row->level;
        $parentKnows = [$row];
        if($row){
            while($row->parent_id!=0){
                $row = KnowsModel::find($row->parent_id);
                array_unshift($parentKnows,$row);
            }
        }
        $childKnows = KnowsModel::where('parent_id',$id)->get();
        return array("parentKnows"=>$parentKnows,"childKnows"=>$childKnows,"level"=>$level);

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
