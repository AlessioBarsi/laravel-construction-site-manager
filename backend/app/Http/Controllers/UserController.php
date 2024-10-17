<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show($id){

        $user = User::find($id);
        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|exists:roles,id',
            'reports' => 'array',
            'reports.*' => 'exists:reports,id'
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

    public function update(Request $request, $id) {

        $user = User::find($id);
            
        if ($user){
        
            $validator = Validator::make($request->all(),[
                'first_name' => 'sometimes|required|string|max:20',
                'last_name' => 'sometimes|required|string|max:20',
                'email' => 'sometimes|required|string|email|max:255|unique:users',
                'password' => 'sometimes|required|string|min:8',
                'role' => 'sometimes|required|exists:roles,id',
                'reports' => 'sometimes|required|array',
                'reports.*' => 'exists:reports,id'
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

    public function destroy($id) {
        $user = User::find($id);

        if ($user){
            $user->delete();
            return response()->json(['message' => 'User deleted'], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
