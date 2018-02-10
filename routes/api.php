<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::prefix('api')->group(function (){
    Route::post('login', 'Auth\LoginController@login');
//});
//
// todo: abstract a register function
Route::middleware(['auth:api'])->group(function (){
    Route::apiResource('template','TemplateController')->except('update');
    Route::apiResource('knows','KnowsController');
    Route::apiResource('questions','QuestionController');
    Route::apiResource('examtype','ExamtypeController');
    Route::apiResource('paper','PaperController');
    Route::post('logout', 'Auth\LoginController@logout');
});
