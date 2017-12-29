<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KnowAssemble extends Model
{
    //
    protected $table = 'know_assemble';

    public function child_id(){
        return $this->hasMany('App\KnowAssemble','from_id');
    }
}
