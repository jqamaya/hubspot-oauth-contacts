<?php

namespace Helpers;

class HubspotContactsHelper extends HubSpotAbstractHelper
{
	protected function getProperties()
	{
		return [
			'hs_lifecyclestage_customer_date',
			'hs_lifecyclestage_lead_date',
			'email',
			'firstname',
			'lastname',
		];
	}

	protected function fetchObjects($hubspot, $request)
	{
		return $hubspot->crm()->contacts()->searchApi()->doSearch($request);
	}

	public function getContacts($accessToken = ''): void
	{
		$results = $this->getData($accessToken);
		self::saveContacts($results, $accessToken);
	}

	public static function saveContacts($contacts, $accessToken): void
	{
		$query = "";
		$conn = openConnection();

		foreach($contacts as $contact)
		{
			$id = $contact->getId();
			$properties = $contact->getProperties();
			$email = $properties['email'];
			$firstName = $properties['firstname'];
			$lastName = $properties['lastname'];
			$leadDate = 0;
			if (isset($properties['hs_lifecyclestage_lead_date'])) {
				$leadDate = (new \DateTime($properties['hs_lifecyclestage_lead_date']))->format('U');
			}
			$customerDate = 0;
			if (isset($properties['hs_lifecyclestage_customer_date'])) {
				$customerDate = (new \DateTime($properties['hs_lifecyclestage_customer_date']))->format('U');
			}
			$archived = $contact->getArchived() ? 1 : 0;
			$createdAt = date_format($contact->getCreatedAt(), "Y-m-d H:i:s");
			$updatedAt = date_format($contact->getUpdatedAt(), "Y-m-d H:i:s");

			$query .= "INSERT INTO `contacts`(`hubspot_id`,`access_token`,`email`,`first_name`,`last_name`,`archived`,`customer_date`,`lead_date`,`created_at`,`updated_at`) ";
			$query .= "VALUES ('$id','$accessToken','$email','$firstName','$lastName','$archived','$customerDate','$leadDate','$createdAt','$updatedAt') ";
			$query .= "ON DUPLICATE KEY UPDATE access_token=VALUES(access_token), archived=VALUES(archived), customer_date=VALUES(customer_date), lead_date=VALUES(lead_date), updated_at=VALUES(updated_at);";
		}

		if ($conn->multi_query($query) === TRUE) {
			echo "New records created successfully";
		} else {
			echo "Error: " . $query . "<br>" . $conn->error;
		}
		closeConnection($conn);
	}

	public static function fetchContactsFromDB()
	{
		try {
			$conn = openConnection();
	
			$limit = 10;
			if (!isset($_GET['page'])) {  
				$page_number = 1;
			} else {
				$page_number = (int)$_GET['page'];
			}
			$initial_page = ($page_number - 1) * $limit;
			$access_token = $_SERVER['HTTP_ACCESS_TOKEN'];
	
			$query = "WHERE access_token = '".$access_token."'";
			if (isset($_GET['start_customer_date']) && isset($_GET['end_customer_date'])) {
				$start_date = (int)$_GET['start_customer_date'];
				$end_date = (int)$_GET['end_customer_date'];
				$query .= " AND customer_date BETWEEN ".$start_date." AND ".$end_date;
			}
	
			$getQuery = "SELECT * FROM contacts ".$query." LIMIT " . $initial_page . ',' . $limit;
			$contacts = $conn->query($getQuery);
			if (!$contacts) {
				return [
					'error' => 'Error fetching contacts',
				];
			}
			$queryCount = "SELECT COUNT(*) FROM contacts ".$query;
			list($total_rows) = mysqli_fetch_row(mysqli_query($conn, $queryCount));
		 
			$total_pages = ceil($total_rows / $limit);
			closeConnection($conn);
	
			return [
				'contacts' => mysqli_fetch_all($contacts, MYSQLI_ASSOC),
				'total' => (int)$total_rows,
				'total_pages' => $total_pages,
			];
		} catch (\ErrorException $e) {
			closeConnection($conn);
			return [
				'contacts' => [],
				'total' => 0,
				'total_pages' => 0,
				'error' => $e->getMessage(),
			];
		}
	}
}
