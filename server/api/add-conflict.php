<?php
include "database.php";

function add_conflict(PDO $conn, int $student, int $time, int $day) {
  $stmt = $conn->prepare("INSERT INTO conflict (student, time, day) 
    VALUES (:student, :time, :day);");

  $stmt->bindParam('student', $student, PDO::PARAM_INT);
  $stmt->bindParam('time', $time, PDO::PARAM_INT);
  $stmt->bindParam('day', $day, PDO::PARAM_INT);

  $stmt->execute();
}

function validate_conflict(int $student, int $time, int $day) {
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

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

$student = $body->student;
$time = $body->time;
$day = $body->day;

validate_conflict($student, $time, $day);

try {
  $conn = connect_to_database();
  add_conflict($conn, $student, $time, $day);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
