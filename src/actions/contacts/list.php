<?php

use Helpers\HubspotContactsHelper;

$result = HubspotContactsHelper::fetchContactsFromDB();
$data = [
  'status' => 200,
  'data' => $result,

];

header('Content-Type: application/json');
echo json_encode($data);
