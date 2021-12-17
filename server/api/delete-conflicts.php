<?php
include "database.php";

function delete_conflicts(PDO $conn, int $student) {
  $stmt = $conn->prepare("DELETE FROM conflict
    WHERE student = :student");

  $stmt->bindParam('student', $student, PDO::PARAM_INT);

  $stmt->execute();
}

header('Content-Type: application/json;');

$body = json_decode(file_get_contents('php://input'));

$student = $body['student'];

if (!is_int($student)) {
  http_response_code(400); 
  die('{ "success": false, "error": "Student is not an integer" }');
}

try {
  $conn = connect_to_database();
  delete_conflicts($conn, $student);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
