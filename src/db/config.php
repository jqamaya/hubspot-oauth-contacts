<?php

  function openConnection() {
    $servername = !empty($_ENV['DB_SERVER_NAME']) ? $_ENV['DB_SERVER_NAME'] : "localhost";
    $username = !empty($_ENV['DB_USERNAME']) ? $_ENV['DB_USERNAME'] : 'root';
    $password = !empty($_ENV['DB_PASSWORD']) ? $_ENV['DB_PASSWORD'] : "";
    $dbname = "hubspot-oauth-contacts";
  
    $conn = new mysqli($servername, $username, $password, $dbname);
  
    if ($conn->connect_error) {
      die("Connection Failed" . $conn->connect_error);
    }
  
    return $conn;
  }

  function closeConnection($conn) {
    $conn->close();
  }
