<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Know extends Model
{
    //
    protected $hidden = ['pivot'];

    public $timestamps = false;

    public function children(){
        return $this->belongsToMany('App\Models\know','know_assembles','from_id','to_id');
    }
    public function parents(){
        return $this->belongsToMany('App\Models\know','know_assembles','to_id','from_id');
    }

    public function questions(){
        return $this->belongsToMany('App\Models\Question');
    }

    public function questionOfChildKnows(){
        if(!$this->children){
            return $this->questions;
        } else {
            return $this->questions->merge($this->children->map(function($item,$key){
                return $item->questionOfChildKnows();
            })->collapse());
        }
    }
}
