<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ManageAdminController extends Controller
{
    use ApiResponse;
    public function __construct(protected UserRepository $userRepository)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $data = $request->all();
            $data['where'] = [
                'role' => 'admin'
            ];
            $admins = $this->userRepository->getPaginate($data);
            return $this->successResponse($admins, 'Get admin líst successfully.');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(),'Server Error', $e->getCode());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $admin = $this->userRepository->findOrFail($id);
            return $this->successResponse($admin, 'Get admin successfully.');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse($e->getMessage(),'Not Found', $e->getCode());
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(),'Server Error', $e->getCode());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
