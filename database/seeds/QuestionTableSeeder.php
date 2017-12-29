<?php

use Illuminate\Database\Seeder;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Question::create(array(
            "type"=>0,
            "stem"=>"1+1=?",
            "options"=>array("the answer is 1","the answer is 2","the answer is 3","the answer is 4"),
            "options_number"=>4,
            "answer"=>1,
            "status"=>1,
            "difficulty_level"=>0,
            "reference"=>0
        ));
    }
}
