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

function view_courses() {
  $query = "SELECT * FROM course";
  $stmt = simpleQuery($db, $query);
  if($stmt == NULL) {
    http_response_code(500);
    die("{ \"error\": " . json_encode($db->error) . " }");
  }

  $stmt->bind_result($course->course_id, $course->time, $course->days, $course->name, $course->si);

  $list = array();
  while($stmt->fetch()) {
    $newCourse = json_encode($course);
    array_push($list, json_decode($newCourse));
  }

  $stmt->close();

  echo json_encode($list);
}

// Customize HTTP header
header('Content-Type: application/json;');

$db = connectToDB();

view_courses();

  // Close the database connection
$db->close();
?>
