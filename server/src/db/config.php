<?php

  function openConnection() {
    $servername = "localhost";
    $username = "root";
    $password = "";
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
