<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Knows extends Model
{
    protected $table = 'know';

    public function child_knows(){
        return $this->hasManyThrough('App\Knows','App\KnowAssemble','from_id',"id","id","to_id");
    }
    public function parent_knows(){
        return $this->hasManyThrough('App\Knows','App\KnowAssemble','to_id',"id","id","from_id");
    }

    public function questions(){
        return $this->belongsToMany('App\Questions');
    }
}
