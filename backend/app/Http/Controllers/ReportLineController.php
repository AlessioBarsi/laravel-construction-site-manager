<?php

namespace App\Http\Controllers;

use App\Models\ReportLine;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReportLineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reportlines = ReportLine::all();
        return response()->json($reportlines, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'line' => 'required|text',
            'image' => 'string',
            'problem' => 'required|in:no,yes,critical',
            'report' => 'required|exists:reports,id',
            'author' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new ReportLine)->getFillable());
        $reportline = ReportLine::create($data);

        return response()->json($reportline, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $reportline = ReportLine::find($id);
        if ($reportline) {
            return response()->json($reportline, 200);
        } else {
            return response()->json(['message' => 'Report line not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $reportline = ReportLine::find($id);
        if ($reportline){

            $validator = Validator::make($request->all(), [
                'line' => 'sometimes|required|text',
                'image' => 'sometimes|string',
                'problem' => 'sometimes|required|in:no,yes,critical',
                'report' => 'sometimes|required|exists:reports,id',
                'author' => 'sometimes|required|exists:users,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $request->only($reportline->getFillable());
            $reportline->update($data);
            
            return response()->json($reportline, 200);

        } else {
            return response()->json(['message' => 'Report line not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $reportline = ReportLine::find($id);

        if ($reportline){
            $reportline->delete();
            return response()->json(['message' => 'Report line deleted'], 200);
        } else {
            return response()->json(['message' => 'Report line not found'], 404);
        }
    }
}
