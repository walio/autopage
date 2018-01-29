<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Paper extends Model
{
    protected $fillable = ['name', 'questions', 'user_id', 'examtype_id','examtype_name','user_name'];

    protected $casts = [
        'questions'=>'array',
    ];

    public function author() {
        return $this->belongsTo('App\Models\User');
    }

    public function examtype(){
        return $this->belongsTo('App\Models\Examtype');
    }
}