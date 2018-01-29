<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
Auth::routes();
Route::get('/', function () {
    return view('welcome');
});

Route::view('/view/{fuck}', 'index')->where('fuck', '.*');
Route::view('/auth/{fuck}', 'index')->where('fuck', '.*');

// todo: abstract a register function
Route::prefix('api')->middleware(['auth:api'])->group(function (){
    Route::resource('knows','KnowsController');
    Route::resource('questions','QuestionController');
    Route::resource('examtype','ExamtypeController');
    Route::resource('paper','PaperController');
    Route::post('logout', 'Auth\LoginController@logout');
});
Route::prefix('api')->group(function (){
    Route::post('login', 'Auth\LoginController@login');
});

Route::middleware(['auth:api'])->group(function (){
    Route::resource('template','TemplateController');
});