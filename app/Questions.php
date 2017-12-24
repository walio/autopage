<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $table = 'question';
    protected $fillable = ['stem', 'options','option_number','answer','digest','difficulty_level','reference'];

    public function questions(){
        return $this->belongsToMany('App\Knows');
    }
}
