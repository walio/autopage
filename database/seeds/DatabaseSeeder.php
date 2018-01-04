<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            KnowAssembleTableSeeder::class,
            KnowTableSeeder::class,
            QuestionKnowsTableSeeder::class,
            QuestionTableSeeder::class
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
