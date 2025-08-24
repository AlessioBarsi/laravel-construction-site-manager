<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

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
            'description'         => 'required|string',
            'site'                => 'required|exists:construction_sites,id',
            'users'               => 'required|array',
            'users.*'             => 'exists:users,id',
            'problem'             => 'sometimes|boolean',
            'problem_description' => 'sometimes|string',
            'critical'            => 'sometimes|boolean',
            'solution'            => 'sometimes|string',
            'author'              => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data   = $request->only((new Report)->getFillable());
        $report = Report::create($data);
        $report->users()->sync($request->users);
        // Handle image upload if present
        if ($request->hasFile('file')) {
            // saves file in storage/app/public/reports
            $path = $request->file('file')->store('reports', 'public');
            //create related media entry
            Media::create([
                'filename' => $path,
                'report_id' => $report->id,
                'media_type' => $request->file('file')->getClientMimeType(),
            ]);
        }

        return response()->json($report, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $report = Report::with('users', 'media')->find($id);
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
        if ($report) {

            $validator = Validator::make($request->all(), [
                'description'         => 'sometimes|string',
                'site'                => 'sometimes|exists:construction_sites,id',
                'users'               => 'sometimes|array',
                'users.*'             => 'exists:users,id',
                'problem'             => 'sometimes|boolean',
                'problem_description' => 'sometimes|string',
                'critical'            => 'sometimes|boolean',
                'solution'            => 'sometimes|string',
                'author'              => 'sometime|exists:users,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors'  => $validator->errors(),
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
        $report = Report::with('media')->find($id);
        if (! $report) {
            return response()->json(['message' => 'Report not found'], 404);
        }
        // Delete files from storage before deleting report
        foreach ($report->media as $media) {
            if ($media->filename && Storage::disk('public')->exists($media->filename)) {
                Storage::disk('public')->delete($media->filename);
            }
        }
        $report->delete();
        return response()->json(['message' => 'Report and related media deleted'], 200);
    }

    public function getUsers($id)
    {
        $report = Report::find($id);
        if ($report) {
            $users = $report->users()->get();
            return response()->json($users, 200);
        } else {
            return response()->json(['message' => 'Report not found'], 404);
        }
    }
}
