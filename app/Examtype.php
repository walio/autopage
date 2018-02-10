<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Examtype extends Model
{
    //
    public $timestamps = false;

    protected $fillable = ['name', 'setting'];

    public function knows(){
        return $this->belongsToMany('App\Know')->select('knows.id','examtype_know.percent');

    }

    public function delete(){
        $this->knows()->detach();
        return parent::delete();
    }
}
