<?php
// include files
include "database.php";
include "classes.php";

function connectToDB() {
  // Establish the database connection
  $db = connectToDatabase(DBDeets::DB_NAME);
  if($db->connect_errno) {
    // http_response_code(500);
    die("{ \"error\": " . json_encode($db->connect_error) . " }");
  }
  return $db;
}

function add_conflict($course) {
  $query = "INSERT INTO conflict (student, time, day) 
  VALUES (?, ?, ?);";
  $ptype = "iii";
  $stmt = complexQueryParam($db, $query, $ptype, $conflict->get_student(), $conflict->get_time(), $conflict->get_day());

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The conflict was unsuccessfully added into the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The conflict was successfully added into the database!\" }";
    $stmt->close();
  }
}

// Customize HTTP header
header('Content-Type: application/json;');

// Retrieve and decode Data
$encoded_body = file_get_contents('php://input');
$body = json_decode($encoded_body);

try {
  $conflict = new Conflict($body->student, $body->time, $body->day);

  $db = connectToDB();

  add_conflict($course);

  // Close the database connection
  $db->close();
} catch(Exception $e) {
  http_response_code(400);
  die("{ \"success\": false, \"error\": \"{$e->getMessage()}\" }");
}

?>