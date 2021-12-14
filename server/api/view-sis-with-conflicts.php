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

function view_sis_with_conflicts() {
  $query = "SELECT student.id, student.name, conflict.time, conflict.day FROM student
  LEFT JOIN conflict ON conflict.student = student.studentid";
  $stmt = simpleQuery($db, $query);
  if($stmt == NULL) {
    http_response_code(500);
    die("{ \"error\": " . json_encode($db->error) . " }");
  }

  $stmt->bind_result($student->student_id, $student->name, $student->time, $student->day);

  $list = array();
  while($stmt->fetch()) {
    $newStudent = json_encode($student);
    array_push($list, json_decode($newStudent));
  }

  $stmt->close();

  echo json_encode($list);
}

// Customize HTTP header
header('Content-Type: application/json;');

$db = connectToDB();

view_sis_with_conflicts();

  // Close the database connection
$db->close();
?>
