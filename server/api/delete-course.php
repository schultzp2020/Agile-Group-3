<?php
include "database.php";

function delete_course(PDO $conn, int $course_id) {
  $stmt = $conn->prepare("DELETE FROM course
    WHERE courseid = :courseid;");

  $stmt->bindParam('courseid', $course_id, PDO::PARAM_INT);

  $stmt->execute();
}

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

$course_id = $body->courseId;

if (!is_int($course_id)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Course ID is not an integer" }');
}

try {
  $conn = connect_to_database();
  delete_course($conn, $course_id);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
