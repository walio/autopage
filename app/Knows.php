<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Knows extends Model
{
    protected $table = 'know';


    protected $hidden = ['pivot'];

    public function children(){
        return $this->belongsToMany('App\knows','know_assemble','from_id','to_id');
    }
    public function parents(){
        return $this->belongsToMany('App\knows','know_assemble','to_id','from_id');
    }

    public function questions(){
        return $this->belongsToMany('App\Questions');
    }
}
