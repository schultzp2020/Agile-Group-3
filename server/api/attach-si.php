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

function attach_si($student_id, $course_id) {
  $query = "UPDATE course
  SET SI = ?
  WHERE courseid = ?;";
  $ptype = "ii";
  $stmt = complexQueryParam($db, $query, $ptype, $student_id, $course_id);

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The course was unsuccessfully updated in the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The course was successfully updated in the database!\" }";
    $stmt->close();
  }
}

// Customize HTTP header
header('Content-Type: application/json;');

// Retrieve and decode Data
$encoded_body = file_get_contents('php://input');
$body = json_decode($encoded_body);

if (!is_int($body->course_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Course ID is not an integer" }');
}

if (!is_int($body->student_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Student ID is not an integer" }');
}

$db = connectToDB();

attach_si($body->student_id, $body->course_id);

// Close the database connection
$db->close();
?>