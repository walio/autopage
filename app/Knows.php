<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Knows extends Model
{
    protected $table = 'know';
    protected $fillable = ['parent_id', 'content','level'];

    public function questions(){
        return $this->belongsToMany('App\Questions');
    }
}
