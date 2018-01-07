<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $table = 'questions';

    protected $fillable = ['stem', 'options','option_number','answer','digest','difficulty_level','reference'];


    protected $casts = [
        'stem'=>'array',
        'options'=> 'array',
    ];

    public function knows(){
        return $this->belongsToMany('App\Knows');
    }
}
