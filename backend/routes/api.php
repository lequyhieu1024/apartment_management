<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\BuildingController;
use App\Http\Controllers\Api\ManageAdminController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Route::prefix('v1')->middleware('verify.apikey')->group(function () { // middleware authenticate api from app
Route::prefix('v1')->group(function () {
    // auth route
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    });

    //upload
    Route::resource('uploads', UploadController::class);

    Route::group(['middleware' => 'auth:sanctum'], function () {

        // Supper Admin Route
        Route::prefix('super-admin')->group(function () {
            Route::resource('manage-admin', ManageAdminController::class);
        });

        // Admin Route
        Route::prefix('admin')->group(function () {
            Route::resource('buildings', BuildingController::class);
        });
    });
});
