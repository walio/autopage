<?php

use Illuminate\Database\Seeder;

class KnowTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('know')->insert([[
            'content'=>"root"
        ],[
            'content'=>"math"
        ],[
            'content'=>'literature'
        ],[
            'content'=>'algebra'
        ],[
            'content'=>'geometry'
        ],[
            'content'=>'factorization'
        ]]);
    }
}
