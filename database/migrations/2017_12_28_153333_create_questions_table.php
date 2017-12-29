<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('type');
            $table->text('stem');
            $table->integer('creator_id')->references('id')->on('users');
            $table->integer('last_modify_user_id')->references('id')->on('users');
            $table->json('options');
            $table->tinyInteger('option_number');
            $table->text('digest');
            $table->integer('status');
            $table->integer('difficulty_level');
            $table->integer('reference');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
