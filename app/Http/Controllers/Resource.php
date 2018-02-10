<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
trait Resource
{

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $results = $request->input("results")?:10;
        $sortField = $request->input("sortField")?:"id";
        $sortOrder = $request->input("sortOrder")?:"asc";
        $ret = $this->modelClass::orderBy($sortField,$sortOrder)->paginate($results);
        $input = $request->only(["results","sortField","sortOrder"]);
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
        $model = new $this->modelClass;
        $model->save();
        return $this->save($model,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = $this->modelClass::findOrFail($id);
        foreach ($this->credentials["relations"] as $relation){
            $model->$relation;
        }
        return $model;
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
        return $this->save($this->modelClass::findOrFail($id),$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->modelClass::findOrFail($id);
        $model->delete();
        return response(null, 200);
    }

    protected function save($model, $request){
        $input = $this->input($request);
        $model->update($input['fields']);
        foreach ($input['relations'] as $relationName => $relation){
            $model->$relationName()->sync($relation);
        }
        return $model;
    }

    public function input($request){
        return ['fields'=>$request->only($this->credentials['fields']),'relations'=>$request->only($this->credentials['relations'])];
    }
}