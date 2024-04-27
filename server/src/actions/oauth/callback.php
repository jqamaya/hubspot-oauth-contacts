<?php

use Helpers\HubspotContactsHelper;
use Helpers\OAuth2Helper;
use HubSpot\Factory;

// https://developers.hubspot.com/docs-beta/working-with-oauth
$tokens = Factory::create()->auth()->oAuth()->tokensApi()->create(
    'authorization_code',
    $_GET['code'],
    OAuth2Helper::getRedirectUri(),
    OAuth2Helper::getClientId(),
    OAuth2Helper::getClientSecret()
);

OAuth2Helper::saveTokenResponse($tokens);

$accessToken = $tokens->getAccessToken();
HubspotContactsHelper::getContacts($accessToken);
echo "Redirecting back to app...";
header("Location: ".$_ENV['APP_URL'].'?access_token='.$accessToken, true, 301);
