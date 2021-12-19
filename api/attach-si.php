<?php
// include files
include "database.php";

function attach_si(PDO $conn, int $student_id, int $course_id) {
  $stmt = $conn->prepare("UPDATE course
    SET SI = :studentid
    WHERE courseid = :courseid;");

  $stmt->bindParam('studentid', $student_id, PDO::PARAM_INT);
  $stmt->bindParam('courseid', $course_id, PDO::PARAM_INT);

  $stmt->execute();
}

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

if(!(isset($body->studentId) && isset($body->courseId))) {
  http_response_code(400); 
  die('{ "success": false, "error": "A parameter is missing" }');
}

$student_id= intval($body->studentId);
$course_id = intval($body->courseId);

if (!is_int($student_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Student ID is not an integer" }');
}

if (!is_int($course_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Course ID is not an integer" }');
}

try {
  $conn = connect_to_database();
  attach_si($conn, $student_id, $course_id);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
