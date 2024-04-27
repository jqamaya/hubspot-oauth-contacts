<?php

// CORS
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');    // cache for 1 day

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

use Helpers\OAuth2Helper;

include_once '../../vendor/autoload.php';
include_once '../db/config.php';
session_start();
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

try {
  $dotenv = Dotenv\Dotenv::createImmutable('../../');
  $dotenv->load();

  $publicRoutes = require '../routes/public.php';
  $protectedRoutes = require '../routes/protected.php';

  if (in_array($uri, $protectedRoutes)) {
    if (!OAuth2Helper::isAuthenticated()) {
      OAuth2Helper::refreshAndGetAccessToken();
    }
  }

  if (!in_array($uri, array_merge($publicRoutes, $protectedRoutes))) {
    http_response_code(404);

    exit;
  }

  $path = __DIR__.'/../actions'.$uri.'.php';

  require $path;
} catch (Throwable $t) {
  $message = $t->getMessage();

  include __DIR__.'/../views/error.php';

  exit;
}
