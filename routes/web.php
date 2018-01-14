<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('view/{fuck:.*}', function () {
    return view('index');
});
$resource = function ($name, $controller) use($router) {
    $router->get("/{$name}","{$controller}@index");

    $router->get("/{$name}/{id}", "{$controller}@show");

    $router->post("/{$name}", "{$controller}@store");

    $router->put("/{$name}/{user}", "{$controller}@update");

    $router->delete("/{$name}/{user}", "{$controller}@destroy");
};
$router->group(['prefix' => 'api','middleware' => 'auth'], function () use ($router,$resource){
    $resource('knows','KnowsController');
    $resource('questions','QuestionController');
});
$resource("user","UserController");
$router->post("api/token", "TokenController@login");
