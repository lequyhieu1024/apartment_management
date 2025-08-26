<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\UserRepository;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;
    public $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(LoginRequest $request)
    {
        $data = $request->all();
        $user = $this->userRepository->getOneBy('email', $data['email']);
        if (!$user || ! Hash::check($data['password'], $user->password)) {
            return $this->errorResponse('Tài khoản không chính xác !');
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công !',
            'data' => [
                'user'  => $user,
                'token' => $token,
            ]
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->all();
        try {
            DB::beginTransaction();
            $user = $this->userRepository->create($data);
            $user->profile()->create([]);
            DB::commit();
            return $this->successResponse($user, 'Đăng ký tài khoản thành công.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse($e->getMessage());
        }
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return $this->successResponse($user, 'Lấy thông tin người dùng thành công');
    }
}
