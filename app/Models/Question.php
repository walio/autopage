<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    //
    protected $fillable = ['stem', 'options','option_number','answer','digest','difficulty_level','reference'];
    
    protected $casts = [
        'stem'=>'array',
        'options'=> 'array',
    ];

    public function knows(){
        return $this->belongsToMany('App\Models\Know');
    }

    public function author() {
        return $this->belongsTo('App\Models\User');
    }
}
