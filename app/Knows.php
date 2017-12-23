<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Knows extends Model
{
    protected $table = 'know';

    public function questions(){
        return $this->belongsToMany('App\Questions');
    }
}
