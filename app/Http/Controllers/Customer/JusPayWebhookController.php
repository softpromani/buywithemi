<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class JusPayWebhookController extends Controller
{
    public function receive_webhook(Request $request)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Basic ')) {
            return response()->json(['error' => 'Invalid Authorization Header'], Response::HTTP_UNAUTHORIZED);
        }

        // Remove "Basic " from the beginning
        $base64Credentials = substr($authHeader, 6);

        // Decode the Base64 encoded credentials
        $decodedCredentials = base64_decode($base64Credentials);
        if (!$decodedCredentials) {
            return response()->json(['error' => 'Invalid Base64 encoding'], Response::HTTP_UNAUTHORIZED);
        }

        // Split the username and password
        [$username, $password] = explode(':', $decodedCredentials, 2);

        // Validate against your configured username and password
        $configuredUsername = env('JUSPAY_WEBHOOK_USERNAME');
        $configuredPassword = env('JUSPAY_WEBHOOK_PASSWORD');

        if ($username !== $configuredUsername || $password !== $configuredPassword) {
            Log::info('user-name-api'.$username);
            Log::info('user-name-env'.$configuredUsername);
            Log::info('user-password-api'.$password);
            Log::info('user-password-env'.$configuredPassword);
            return response()->json(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        // Process the webhook payload
        $payload = $request->json()->all();

        // Log or handle the payload as required
        Log::info('Received Juspay webhook', $payload);

        // Respond with a 200 OK
        return response()->json(['status' => 'Webhook received successfully'], Response::HTTP_OK);
    }
}
