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

function add_course($course) {
  $query = "INSERT INTO course (time, days, name) 
  VALUES (?, ?, ?);";
  $ptype = "iss";
  $stmt = complexQueryParam($db, $query, $ptype, $course->get_time(), $course->get_days(), $course->get_name());

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The course was unsuccessfully added into the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The course was successfully added into the database!\" }";
    $stmt->close();
  }
}

// Customize HTTP header
header('Content-Type: application/json;');

// Retrieve and decode Data
$encoded_body = file_get_contents('php://input');
$body = json_decode($encoded_body);

try {
  $course = new Course($body->time, $body->days, $body->name);

  $db = connectToDB();

  add_course($course);

  // Close the database connection
  $db->close();
} catch(Exception $e) {
  http_response_code(400);
  die("{ \"success\": false, \"error\": \"{$e->getMessage()}\" }");
}
?>