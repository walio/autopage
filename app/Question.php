<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Question extends Model
{
    //

    use SoftDeletes;

    protected $fillable = ['stem', 'options','option_number','answer','digest','difficulty_level','reference'];
    
    protected $casts = [
        'options'=> 'array',
    ];

    /**
     * 需要被转换成日期的属性。
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public function knows(){
        return $this->belongsToMany('App\Know');
    }

    public function author() {
        return $this->belongsTo('App\User');
    }
}
