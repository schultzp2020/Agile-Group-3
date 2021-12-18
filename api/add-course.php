<?php
include "database.php";

function add_course(PDO $conn, int $time, string $days, string $name) {
  $stmt = $conn->prepare("INSERT INTO course (time, days, name) 
    VALUES (:time, :days, :name);");

  $stmt->bindParam('time', $time, PDO::PARAM_INT);
  $stmt->bindParam('days', $days, PDO::PARAM_STR);
  $stmt->bindParam('name', $name, PDO::PARAM_STR);

  $stmt->execute();
}

function validate_course(int $time, string $days, string $name) {
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

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

$time = $body->time;
$days = $body->days;
$name = $body->name;

validate_course($time, $days, $name);

try {
  $conn = connect_to_database();
  add_course($conn, $time, $days, $name);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
