<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConstructionSiteController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReportLineController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Role
//Index: Get all records
Route::get('/roles', [RoleController::Class, 'index']);
//Show: Get a single record (if it exists)
Route::get('/roles/{id}', [RoleController::Class, 'show']);
//Store: Save a new record
Route::post('/roles', [RoleController::Class, 'store']);
//Update: Update an existing record (if it exists)
Route::put('/roles/{id}', [RoleController::Class, 'update']);
//Destroy: Delete an existing record (if it exists)
Route::delete('/roles/{id}', [RoleController::Class, 'destroy']);

//User
Route::get('/users', [UserController::Class, 'index']);
Route::get('/users/{id}', [UserController::Class, 'show']);
Route::post('/users', [UserController::Class, 'store']);
Route::put('/users/{id}', [UserController::Class, 'update']);
Route::delete('/users/{id}', [UserController::Class, 'destroy']);

//ConstructionSite
Route::get('/construction-sites', [ConstructionSiteController::Class, 'index']);
Route::get('/construction-sites/{id}', [ConstructionSiteController::Class, 'show']);
Route::post('/construction-sites', [ConstructionSiteController::Class, 'store']);
Route::put('/construction-sites/{id}', [ConstructionSiteController::Class, 'update']);
Route::delete('/construction-sites/{id}', [ConstructionSiteController::Class, 'destroy']);

//Report
Route::get('/reports', [ReportController::Class, 'index']);
Route::get('/reports/{id}', [ReportController::Class, 'show']);
Route::post('/reports', [ReportController::Class, 'store']);
Route::put('/reports/{id}', [ReportController::Class, 'update']);
Route::delete('/reports/{id}', [ReportController::Class, 'destroy']);

//ReportLine
Route::get('/report-lines', [ReportLineController::Class, 'index']);
Route::get('/report-lines/{id}', [ReportLineController::Class, 'show']);
Route::post('/report-lines', [ReportLineController::Class, 'store']);
Route::put('/report-lines/{id}', [ReportLineController::Class, 'update']);
Route::delete('/report-lines/{id}', [ReportLineController::Class, 'destroy']);