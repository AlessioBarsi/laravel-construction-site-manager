<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function index(){
        $roles = Role::all();
        return response()->json($roles, 200);
    }

    public function show($id) {
        $role = Role::find($id);
        if ($role) {
            return response()->json($role, 200);
        } else {
            return response()->json(['message' => 'Role not found'], 404);
        }
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'icon' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new Role)->getFillable());
        $role = Role::create($data);

        return response()->json($role, 201);
    }

    public function update(Request $request, $id){

        $role = Role::find($id);

        if ($role){

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string',
                'icon' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->only($role->getFillable());
            $role->update($data);
            
            return response()->json($role, 200);
        } else {
            return response()->json(['message' => 'Role not found'], 404);
        }
    }

    public function destroy($id){

        $role = Role::find($id);

        if ($role){
            $role->delete();
            return response()->json(['message' => 'Role deleted'], 200);
        } else {
            return response()->json(['message' => 'Role not found'], 404);
        }
    }
}
