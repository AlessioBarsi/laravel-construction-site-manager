<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConstructionSiteController;
use App\Http\Controllers\ReportController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Login Route
Route::post('/login', function (Request $request) {
    if (! Auth::attempt($request->only('email', 'password'))) {
        return response(['message' => __('auth.failed')], 422);
    }
    
    $user = auth()->user();
    $token = auth()->user()->createToken('client-app');
    return [
        'token' => $token->plainTextToken,
        'id' => $user->id,
    ];
});
// Logout Route
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->noContent();
});

//Role
Route::get('/roles', [RoleController::Class, 'index']);
Route::get('/roles/{id}', [RoleController::Class, 'show']);
Route::post('/roles', [RoleController::Class, 'store']);
Route::put('/roles/{id}', [RoleController::Class, 'update']);
Route::delete('/roles/{id}', [RoleController::Class, 'destroy']);

//User
Route::get('/users', [UserController::Class, 'index']);
Route::get('/users/{id}', [UserController::Class, 'show']);
Route::post('/users', [UserController::Class, 'store']);
Route::put('/users/bulk-site-update', [UserController::Class, 'bulkSiteUpdate']);
Route::put('/users/{id}', [UserController::Class, 'update']);
Route::delete('/users/{id}', [UserController::Class, 'destroy']);
Route::put('/users/change-password/{id}', [UserController::Class, 'changePassword']);

//ConstructionSite
Route::get('/construction-sites', [ConstructionSiteController::Class, 'index']);
Route::get('/construction-sites/{id}', [ConstructionSiteController::Class, 'show']);
Route::post('/construction-sites', [ConstructionSiteController::Class, 'store']);
Route::put('/construction-sites/{id}', [ConstructionSiteController::Class, 'update']);
Route::delete('/construction-sites/{id}', [ConstructionSiteController::Class, 'destroy']);
Route::get('/construction-sites/get-users/{id}', [ConstructionSiteController::Class, 'getUsers']);

//Report
Route::get('/reports', [ReportController::Class, 'index']);
Route::get('/reports/{id}', [ReportController::Class, 'show']);
Route::post('/reports', [ReportController::Class, 'store']);
Route::put('/reports/{id}', [ReportController::Class, 'update']);
Route::delete('/reports/{id}', [ReportController::Class, 'destroy']);
Route::get('/reports/get-users/{id}', [ReportController::Class, 'getUsers']);