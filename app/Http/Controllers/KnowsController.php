<?php

namespace App\Http\Controllers;

use App\Models\Know as KnowsModel;
use App\Models\KnowAssemble as KnowsAssembleModel;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class KnowsController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        return ['nodes'=>KnowsModel::all(),'arcs'=>KnowsAssembleModel::all()];
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
        $p = $request->input('parents');
        $c = $request->input('content');
        $k = KnowsModel::firstOrCreate('content',$c);
        if(!$k->wasRecentlyCreated){
            return response("知识点已存在，请勿重复添加",400);
        }
        try{
            array_map(function($v) use($k){
                KnowsModel::find($v)->children->save($k);
            },$p);
        }catch (ModelNotFoundException $e) {
            return response("父节点未找到",400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        //
        $row = KnowsModel::find($id);
        $row || $row = KnowsModel::where("content","root")->first();
        $fields = explode(',',$request->input('fields'));
        array_map(function($v) use($row){
            $row->$v;
        },$fields);
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
