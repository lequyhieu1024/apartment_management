<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UploadController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of uploaded images.
     */
    public function index()
    {
        try {
            $files = Storage::disk('public')->files('uploads');
            $images = array_map(function ($file) {
                return [
                    'filename' => basename($file),
                    'url' => Storage::url($file),
                    'path' => $file,
                ];
            }, $files);

            return $this->successResponse($images);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve images: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created image in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $path = $request->file('file')->store('uploads', 'public');

            $result = [
                'url' => Storage::url($path),
                'filename' => basename($path),
            ];

            return $this->successResponse($result);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->errors(), 422);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to upload image: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified image.
     */
    public function show(string $filename)
    {
        try {
            $path = 'uploads/' . $filename;
            if (!Storage::disk('public')->exists($path)) {
                return $this->errorResponse('Image not found', 404);
            }

            $image = [
                'filename' => $filename,
                'url' => Storage::url($path),
                'size' => Storage::disk('public')->size($path),
                'last_modified' => Storage::disk('public')->lastModified($path),
            ];

            return $this->successResponse($image);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to retrieve image: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update the specified image in storage.
     */
    public function update(Request $request, string $filename)
    {
        try {
            $request->validate([
                'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $path = 'uploads/' . $filename;
            if (!Storage::disk('public')->exists($path)) {
                return $this->errorResponse('Image not found', 404);
            }

            // Delete the old file
            Storage::disk('public')->delete($path);

            // Store the new file with the same filename
            $newPath = $request->file('file')->storeAs('uploads', $filename, 'public');

            $result = [
                'url' => Storage::url($newPath),
                'filename' => $filename,
            ];

            return $this->successResponse($result);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->errors(), 422);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update image: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified image from storage.
     */
    public function destroy(string $filename)
    {
        try {
            $path = 'uploads/' . $filename;
            if (!Storage::disk('public')->exists($path)) {
                return $this->errorResponse('Image not found', 404);
            }

            Storage::disk('public')->delete($path);

            return $this->successResponse(['message' => 'Image deleted successfully']);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete image: ' . $e->getMessage(), 500);
        }
    }
}
