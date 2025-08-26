<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $clientSignature = $request->header('x-api-key');
        $timestamp = $request->header('x-timestamp');

        // Kiểm tra timestamp có tồn tại không
        if (!$timestamp || !$clientSignature) {
            return response()->json(['error' => 'Missing API Key'], 400);
        }

        // Chống replay attack: lệch quá 5 phút thì reject
        if (abs(time() * 1000 - (int)$timestamp) > 5 * 60 * 1000) {
            return response()->json(['error' => 'Request expired'], 401);
        }

        $apiKey = env('EXPO_PUBLIC_API_KEY');

        // Hash lại bằng SHA256
        $serverSignature = hash('sha256', $apiKey . $timestamp);

        if (!hash_equals($serverSignature, $clientSignature)) {
            return response()->json(['error' => 'Invalid API Key'], 403);
        }

        return $next($request);
    }
}
