<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
trait Resource
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        /**
         * Display a listing of the resource.
         *
         * @return \Illuminate\Http\Response
         */
        $results = $request->input("results")?:20;
        $sortField = $request->input("sortField")?:"id";
        $sortOrder = $request->input("sortOrder")?:"asc";
//        var_dump($sortField);
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
        $model = $this->findOrFail($id);
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
        return $this->save($this->findOrFail($id),$request);
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
        $model = $this->findOrFail($id);
        $model->delete();
        return response(null, 200);
    }


    // firstOrFail automatically return 404,but I dont want to 'cause 404 is for wrong route
    protected function findOrFail($id){
        return $this->modelClass::find($id)?:response("资源未找到",400);
    }

    protected function save($model, $request){
        $input = $this->input($request);
        $model->update($input['fields']);
        foreach ($input['relations'] as $relationName => $relation){
            $t = [];
            foreach ($relation as $record){
                $t[$record['id']] = array_except($record, ['id']);
            }
            $model->$relationName()->sync($t);
        }
        return $model;
    }

    public function input($request){
        return ['fields'=>$request->only($this->credentials['fields']),'relations'=>$request->only($this->credentials['relations'])];
    }
}