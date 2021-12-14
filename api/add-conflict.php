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

function add_conflict($student, $time, $day) {
  $query = "INSERT INTO conflict (student, time, day) 
  VALUES (?, ?, ?);";
  $ptype = "iii";
  $stmt = complexQueryParam($db, $query, $ptype, $student, $time, $day);

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The conflict was unsuccessfully added into the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The conflict was successfully added into the database!\" }";
    $stmt->close();
  }
}

function validate_conflict($student, $time, $day) {
  if(!is_int($student)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Student is not a number" }');
  }

  if(!is_int($time)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Time is not a number" }');
  }

  if(!($day >= 0 and $day < 5)) {
    http_response_code(400); 
    die('{ "success": false, "error": "Day is not a number between 0-4" }');
  }
}

// Customize HTTP header
header('Content-Type: application/json;');

// Retrieve and decode Data
$encoded_body = file_get_contents('php://input');
$body = json_decode($encoded_body);

validate_conflict($body->student, $body->time, $body->day);

$db = connectToDB();

add_conflict($body->student, $body->time, $body->day);

  // Close the database connection
$db->close();
?>
