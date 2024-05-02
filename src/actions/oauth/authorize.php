<?php

include '../Helpers/OAuth2Helper.php';

use Helpers\OAuth2Helper;
use HubSpot\Utils\OAuth2;

$authUrl = OAuth2::getAuthUrl(
    OAuth2Helper::getClientId(),
    OAuth2Helper::getRedirectUri(),
    OAuth2Helper::getScope()
);

$data = [
    'auth_url' => $authUrl,
];
header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);
