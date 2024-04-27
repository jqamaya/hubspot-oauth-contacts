<?php

namespace Helpers;

use HubSpot\Client\Auth\OAuth\Model\TokenResponseIF;
use HubSpot\Factory;

class OAuth2Helper
{
	public const APP_REQUIRED_SCOPES = ['crm.objects.contacts.read'];
	public const CALLBACK_PATH = '/oauth/callback';
	public const SESSION_TOKENS_KEY = 'tokens';

	public static function getClientId(): string
	{
		$clientId = $_ENV['HUBSPOT_CLIENT_ID'];
		if (empty($clientId)) {
			throw new \Exception('Please specify HUBSPOT_CLIENT_ID in .env');
		}

		return $clientId;
	}

	public static function getClientSecret(): string
	{
		$clientSecret = $_ENV['HUBSPOT_CLIENT_SECRET'];
		if (empty($clientSecret)) {
			throw new \Exception('Please specify HUBSPOT_CLIENT_SECRET in .env');
		}

		return $clientSecret;
	}

	public static function getRedirectUri(): string
	{
		return UrlHelper::generateServerUri().static::CALLBACK_PATH;
	}

	public static function getScope(): array
	{
		return static::APP_REQUIRED_SCOPES;
	}

	public static function saveTokenResponse(TokenResponseIF $tokens): void
	{
		$refresh_token = $tokens->getRefreshToken();
		$access_token = $tokens->getAccessToken();
		$expires_in = $tokens->getExpiresIn();
		$expires_at = time() + $expires_in;
		$conn = openConnection();
		$sql = "INSERT INTO `users`(`refresh_token`, `access_token`, `expires_in`, `expires_at`) 
				VALUES ('$refresh_token','$access_token','$expires_in','$expires_at')";
		$result = $conn->query($sql);

		// if ($result == TRUE) {
		// 	echo "New record created successfully.";
		// }else{
		// 	echo "Error:". $sql . "<br>". $conn->error;
		// }
		closeConnection($conn);
	}

	public static function isAuthenticated(): bool
	{
		$accessToken = $_SERVER['HTTP_ACCESS_TOKEN'];

		$conn = openConnection();
		$getQuery = "SELECT expires_at FROM users WHERE access_token=?";
		$expiresAt = $conn->execute_query($getQuery, [$accessToken])->fetch_column();
		closeConnection($conn);

		if ($expiresAt) {
			return $expiresAt >= time();
		}
		return false;
	}

	public static function refreshAndGetAccessToken(): string
	{
		$accessToken = $_SERVER['HTTP_ACCESS_TOKEN'];

		$conn = openConnection();
		$getQuery = "SELECT * FROM users WHERE access_token=?";
		$result = $conn->execute_query($getQuery, [$accessToken])->fetch_assoc();
		closeConnection($conn);

		if (time() > $result['expires_at']) {
			$tokens = Factory::create()->auth()->oAuth()->tokensApi()->create(
				'refresh_token',
				null,
				static::getRedirectUri(),
				static::getClientId(),
				static::getClientSecret(),
				$result['refresh_token'],
			);
			self::saveTokenResponse($tokens);
			return $result['refresh_token'];
		}
		return '';
	}
}
