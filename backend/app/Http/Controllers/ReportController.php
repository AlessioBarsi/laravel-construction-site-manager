<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reports = Report::with('users')->get();
        return response()->json($reports, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
            'site' => 'required|exists:construction_sites,id',
            'users' => 'required|array',
            'users.*' => 'exists:users,id',
            'problem' => 'sometimes|boolean',
            'problem_description' => 'sometimes|string',
            'critical' => 'sometimes|boolean',
            'solution' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new Report)->getFillable());
        $report = Report::create($data);
        $report->users()->attach($request->users);
        return response()->json($report, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $report = Report::with('users')->find($id);
        if ($report) {
            return response()->json($report, 200);
        } else {
            return response()->json(['message' => 'Site not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $report = Report::find($id);
        if ($report){

            $validator = Validator::make($request->all(), [
                'description' => 'sometimes|string',
                'site' => 'sometimes|exists:construction_sites,id',
                'users' => 'sometimes|array',
                'users.*' => 'exists:users,id',
                'problem' => 'sometimes|boolean',
                'problem_description' => 'sometimes|string',
                'critical' => 'sometimes|boolean',
                'solution' => 'sometimes|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->only($report->getFillable());
            $report->users()->attach($request->users);
            $report->update($data);
            
            return response()->json($report, 200);

        } else {
            return response()->json(['message' => 'Report not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $report = Report::find($id);
        if ($report){
            $report->delete();
            return response()->json(['message' => 'Report deleted'], 200);
        } else {
            return response()->json(['message' => 'Report not found'], 404);
        }
    }

    public function getUsers($id)
    {
        $report = Report::find($id);
        if ($report){
            $users = $report->users()->get();
            return response()->json($users, 200);
        } else {
            return response()->json(['message' => 'Report not found'], 404);
        }
    }
}
