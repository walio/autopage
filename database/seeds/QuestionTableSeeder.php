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
        DB::table('questions')->insert([
            "type"=>0,
            "stem"=>"1+1=?",
            "options"=> json_encode(["the answer is 1","the answer is 2","the answer is 3","the answer is 4"]),
            "answer"=>1,
            "status"=>1,
            "difficulty_level"=>0,
            "creator_id"=>1
        ]);
    }
}
