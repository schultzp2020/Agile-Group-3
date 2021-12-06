<?php
// include files
include "database.php";

// Functions
function connectToDB() {
  // Establish the database connection
  $db = connectToDatabase(DBDeets::DB_NAME);
  if($db->connect_errno) {
    // http_response_code(500);
    die("{ \"error\": " . json_encode($db->connect_error) . " }");
  }
  return $db;
}

// Customize HTTP header
header('Content-Type: application/json;');

$db = connectToDB();

// Close the database connection
$db->close();
?>