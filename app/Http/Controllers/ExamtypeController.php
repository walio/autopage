<?php

namespace App\Http\Controllers;

use App\Examtype;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Resources\Json\Resource;

class ExamtypeController extends BaseController
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
        $ret = Examtype::orderBy($sortField,$sortOrder)->paginate($results);
        $input = $request->only(["results","sortField","sortOrder","fields"]);
        $ret->appends($input);
        return $ret;
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
        return $this->save(new Examtype,$this->credential($request));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $examtype = $this->find($id);
        foreach ($examtype->knows as $know){
            $know->percent = $know->pivot->percent;
        }
        return $examtype;
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
        $examtype = $this->find($id);
        $examtype->knows()->detach();
        return $this->save($examtype,$this->credential($request));
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
        $examtype = $this->find($id);
        $examtype->knows()->detach();
        $examtype->delete();
        return response(null, 200);
    }

    // todo: filter user input?
    public function credential(Request $request){
        return $request->only(['name','knows','setting']);
    }

    public function find($id){
        $examtype = Examtype::find($id);
        if(!$examtype) return response("试卷类型未找到",400);
        return $examtype;
    }

    public function save($examtype, $credentials){
        $examtype->name = $credentials['name'];
        $examtype->save();
        array_map(function ($know) use($examtype){
            $examtype->knows()->attach($know['id'], ['percent'=>$know['percent']]);
        },$credentials['knows']);
        return $examtype;
    }
}
