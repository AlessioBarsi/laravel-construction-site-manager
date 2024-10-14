<?php

namespace App\Http\Controllers;

use App\Models\ConstructionSite;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ConstructionSiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sites = ConstructionSite::all();
        return response()->json($sites, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'client'=> 'required|string',
            'location'=> 'required|string',
            'start_date'=> 'required|date',
            'end_date'=> 'date',
            'status'=> 'required|in:not_started,open,closed',
            'director'=> 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new ConstructionSite)->getFillable());
        $site = ConstructionSite::create($data);

        return response()->json($site, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $site = ConstructionSite::find($id);
        if ($site) {
            return response()->json($site, 200);
        } else {
            return response()->json(['message' => 'Site not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $site = ConstructionSite::find($id);
        if ($site){

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string',
                'client'=> 'sometimes|required|string',
                'location'=> 'sometimes|required|string',
                'start_date'=> 'sometimes|required|date',
                'end_date'=> 'sometimes|date',
                'status'=> 'sometimes|required|in:not_started,open,closed',
                'director'=> 'sometimes|required|exists:users,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->only($site->getFillable());
            $site->update($data);
            
            return response()->json($site, 200);

        } else {
            return response()->json(['message' => 'Site not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $site = ConstructionSite::find($id);

        if ($site){
            $site->delete();
            return response()->json(['message' => 'Site deleted'], 200);
        } else {
            return response()->json(['message' => 'Site not found'], 404);
        }
    }
}
