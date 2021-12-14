<?php
// include files
include "database.php";

function connectToDB() {
  // Establish the database connection
  $db = connectToDatabase(DBDeets::DB_NAME);
  if($db->connect_errno) {
    // http_response_code(500);
    die("{ \"error\": " . json_encode($db->connect_error) . " }");
  }
  return $db;
}

function delete_course($course_id) {
  $query = "DELETE FROM course
  WHERE courseid = ?;";
  $ptype = "i";
  $stmt = complexQueryParam($db, $query, $ptype, $course_id);

  if($stmt == NULL) {
    http_response_code(400);
    die("{ \"success\": false, \"error\": \"The course was unsuccessfully deleted from the database!\" }");
  } else {
    echo "{ \"success\": true, \"status\": \"The course was successfully deleted from the database!\" }";
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

$db = connectToDB();

delete_course($body->course_id);

// Close the database connection
$db->close();
?>
