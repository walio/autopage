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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/view/knows', function () {
    return view('Exam\home');
});
Route::get('/view/addKnows', function () {
    return view('Exam\home');
});
Route::get('/view/modifyKnows', function () {
    return view('Exam\home');
});
Route::get('/view/questions', function () {
    return view('Exam\home');
});
Route::get('/view/modifyQuestions', function () {
    return view('Exam\home');
});
Route::resource('api/knows','Exam\KnowsController');
Route::resource('api/questions','Exam\QuestionController');