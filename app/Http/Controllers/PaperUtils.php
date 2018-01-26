<?php

namespace App\Http\Controllers;


use App\Models\Know;
use phpDocumentor\Reflection\Types\Array_;

class PaperUtils
{
    /**
     * select questions depending on percent config.
     *
     * @return Array_
     */
    public static function questions(array $distribution,bool $selectRare = false){
        return array_reduce($distribution,function ($acc, $cur) use($selectRare) {
            $questions = Know::find($cur['id'])->questionOfChildKnows()->whereNotIn('questions.id',$acc);
            $questions = $questions->sortBy(function ($questions, $key) use($selectRare) {
                if ($selectRare){
                    return random_int(1, 10) / pow($questions['reference'] ?: 1, 2);
                } else {
                    return random_int(1, 10);
                }
            });
            $selected = $questions->take($cur['percent'])->map(function($item,$key){
                return $item['id'];
            })->all();
            return array_merge($acc,$selected);
        }, []);
    }

    /**
     * create word file from questions
     *
     * @return \Illuminate\Http\Response
     */
    public static function word($questions, $templateFile, $config){

    }

    public static function addReference($paper){

    }

    public static function removeReference($paper){

    }
}