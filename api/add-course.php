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

function add_course($time, $days, $name) {
  $query = "INSERT INTO course (time, days, name) 
  VALUES (?, ?, ?);";
  $ptype = "iss";
  $stmt = complexQueryParam($db, $query, $ptype, $time, $days, $name);

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The course was unsuccessfully added into the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The course was successfully added into the database!\" }";
    $stmt->close();
  }
}

function validate_course($time, $days, $name) {
  if(!is_int($time)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Time is not a number" }');
  }

  if(!is_string($days)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Days is not a string" }');
  }

  if(!is_string($name)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Name is not a string" }');
  }

  // Split days into array
  // e.g. 'M,W,F' into ['M','W','F']
  $exploded_days = explode(',', $days);

  foreach($exploded_days as $day) {
    if(!($day === 'M' || $day === 'T' || $day === 'W' || $day === 'Th' || $day === 'F')) {
      http_response_code(400); 
      die('{ "success": false, "error": "Days is not a string array" }');
    }
  }
}

// Customize HTTP header
header('Content-Type: application/json;');

// Retrieve and decode Data
$encoded_body = file_get_contents('php://input');
$body = json_decode($encoded_body);

validate_course($body->time, $body->days, $body->name);

$db = connectToDB();

add_course($body->time, $body->days, $body->name);

// Close the database connection
$db->close();
?>
