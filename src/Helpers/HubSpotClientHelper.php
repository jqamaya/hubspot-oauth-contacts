<?php

namespace Helpers;

use HubSpot\Discovery\Discovery;
use HubSpot\Factory;
use Helpers\OAuth2Helper;

class HubspotClientHelper
{
    public static function createFactory(): Discovery
    {
        if (OAuth2Helper::isAuthenticated()) {
            $accessToken = OAuth2Helper::refreshAndGetAccessToken();

            return Factory::createWithAccessToken($accessToken);
        }

        throw new \Exception('Please authorize via OAuth');
    }
}
