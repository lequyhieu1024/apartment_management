<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BuildingFormRequest;
use App\Models\Building;
use App\Repositories\BuildingRepository;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuildingController extends Controller
{
    use ApiResponse;
    public function __construct(protected BuildingRepository $buildingRepository)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $data = $request->all();
            $buildings = $this->buildingRepository->getFilter($data);
            return $this->successResponse($buildings, 'Get building list successfully');
        } catch (\Exception $exception) {
            return $this->errorResponse($exception->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BuildingFormRequest $request)
    {
        try {
            $data = $request->all();
            $data['owner_user_id'] = $request->user()->id;
            $building = $this->buildingRepository->create($data);
            return $this->successResponse($building, 'Create building successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
