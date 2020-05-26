<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;

use Response;

class ResultsController extends Controller
{
    public function search(Request $request)
    {
        $places = Result::where('description', 'LIKE', "%{$request->input('query')}%")->take(10)->get();
        return response()->json($places);
    }

    public function save(Request $request)
    {
        $results = $request->results;

        foreach ($results as $r)
        {
            $exists = Result::where('google_id', $r['id'])->first();
            if (!$exists) {
                $result = new Result;
                $result->description = $r['description'];
                $result->google_id = $r['id'];
                $result->place_id = $r['place_id'];
                $result->reference = $r['reference'];
                $result->main_text = $r['structured_formatting']['main_text'];
                $result->secondary_text = $r['structured_formatting']['secondary_text'];
                $result->save();
            }
        }

        return Response::json([], 200);
    }
}
