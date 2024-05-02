<?php

namespace Helpers;

use HubSpot\Factory;
use HubSpot\Client\Crm\Contacts\Model\PublicObjectSearchRequest;

abstract class HubSpotAbstractHelper
{
  abstract protected function getProperties();
  abstract protected function fetchObjects($hubspot, $request);
  
	protected function getData($accessToken = ''): array
	{
		if (empty($accessToken)) {
			$result = OAuth2Helper::fetchLatestUser();
			if (!$result) {
				exit(0);
			}
			$accessToken = $result['access_token'];
		}
		$after = null;
		$hubspot = Factory::createWithAccessToken($accessToken);
		$request = new PublicObjectSearchRequest([
			'properties' => $this->getProperties(),
		]);
		$request->setLimit(100);
		$results = [];

		do {
			if (!is_null($after)) {
				$request->setAfter($after);
			}
      $objects = $this->fetchObjects($hubspot, $request);

			array_push($results, $objects->getResults());
			if ($objects->getPaging()) {
				$after = $objects->getPaging()->getNext()->getAfter();
			} else {
				$after = null;
			}
		} while (isset($after));
    return $results[0];
	}
}
