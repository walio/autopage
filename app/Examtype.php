<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Examtype extends Model
{
    //
    protected $table = 'examtypes';

    public $timestamps = false;

    public function knows(){
        return $this->belongsToMany('App\Know')->select('knows.id')->withPivot('percent');
    }
}
