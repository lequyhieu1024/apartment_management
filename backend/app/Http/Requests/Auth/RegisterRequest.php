<?php

namespace App\Http\Requests\Auth;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    use ApiResponse;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255|min:5',
            'email' => [
                'required','email','max:255',
                $this->isMethod('post')
                    ? Rule::unique('users', 'email')
                    : Rule::unique('users', 'email')->ignore($this->route('id')),            ],
            'password' => 'required|min:6',
            'role' => 'required|in:member,admin',
        ];
    }
}
