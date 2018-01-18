<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Know extends Model
{
    //
    protected $table = 'knows';
    
    protected $hidden = ['pivot'];

    public $timestamps = false;

    public function children(){
        return $this->belongsToMany('App\know','know_assemble','from_id','to_id');
    }
    public function parents(){
        return $this->belongsToMany('App\know','know_assemble','to_id','from_id');
    }

    public function questions(){
        return $this->belongsToMany('App\Question');
    }
}
