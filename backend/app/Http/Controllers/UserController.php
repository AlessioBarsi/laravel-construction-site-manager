<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ConstructionSite;
use App\Http\Controllers\Controller;
use Dotenv\Exception\ValidationException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show($id)
    {

        $user = User::find($id);
        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|exists:roles,id',
            'reports' => 'array',
            'reports.*' => 'exists:reports,id',
            'site' => 'exists:construction_sites,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new User)->getFillable());
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $user->reports()->attach($request->reports);
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {

        $user = User::find($id);

        if ($user) {

            $validator = Validator::make($request->all(), [
                'first_name' => 'sometimes|required|string|max:20',
                'last_name' => 'sometimes|required|string|max:20',
                'email' => 'sometimes|required|string|email|max:255|unique:users',
                'password' => 'sometimes|required|string|min:8',
                'role' => 'sometimes|required|exists:roles,id',
                'reports' => 'sometimes|required|array',
                'reports.*' => 'exists:reports,id',
                'site' => 'exists:construction_sites,id',
                'admin' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->only($user->getFillable());

            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }

            $user->update($data);
            $user->reports()->attach($request->reports);
            return response()->json($user, 200);

        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted'], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function bulkSiteUpdate(Request $request)
    {
        $validatedData = $request->validate([
            'users_assign' => 'required|array',
            'users_assign.*' => 'exists:users,id',
            'users_noassign' => 'required|array',
            'users_noassign.*' => 'exists:users,id',
            'site' => 'required|exists:construction_sites,id',
        ]);

        $site = ConstructionSite::find($validatedData['site']);
        if ($site) {
            User::whereIn('id', $validatedData['users_assign'])->update(['site' => $validatedData['site']]);
            //Log::info(json_encode($site->users()));
            $site_users = $site->users()->get();

            //Log::info(json_encode($site_users->get()));
            foreach ($site_users as $u) {
                if (in_array($u->id, $validatedData['users_noassign'])) {
                    //Set the value of 'site' filed to null
                    $u->update(['site' => null]);
                }
            }
            return response()->json(['message' => 'Users site has been updated'], 201);
        } else {
            return response()->json(['message' => 'Site not found'], 404);
        }
    }
}