<?php
include "database.php";

function detach_si(PDO $conn, int $course_id) {
  $stmt = $conn->prepare("UPDATE course
    SET SI = NULL
    WHERE courseid = :courseid;");

  $stmt->bindParam('courseid', $course_id, PDO::PARAM_INT);

  $stmt->execute();
}

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

if(!isset($body->courseId)) {
  http_response_code(400); 
  die('{ "success": false, "error": "A parameter is missing" }');
}

$course_id = intval($body->courseId);

if (!is_int($course_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Course ID is not an integer" }');
}

try {
  $conn = connect_to_database();
  detach_si($conn, $course_id);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
