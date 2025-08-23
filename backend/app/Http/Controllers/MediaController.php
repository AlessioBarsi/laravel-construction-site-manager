<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $media = Media::all();
        return response()->json($media, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'filename' => 'required|string',
            'report_id' => 'required|integer|exists:reports,id',
            'media_type' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only((new Media)->getFillable());
        $media = Media::create($data);

        return response()->json($media, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        $media = Media::find($id);
        if ($media) {
            return response()->json($media, 200);
        } else {
            return response()->json(['message' => 'Media not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id){

        $media = Media::find($id);
        //TODO: Delete the file from storage as well
        if ($media) {
            $media->delete();
            return response()->json(['message' => 'Media deleted'], 200);
        } else {
            return response()->json(['message' => 'Media not found'], 404);
        }
    }
}
