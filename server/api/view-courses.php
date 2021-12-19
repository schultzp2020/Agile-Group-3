<?php
include "database.php";

class Course {
  public int $courseId;
  public int $name;
  public string $time;
  public int $days;
  public int $si;

  public function __construct(int $courseId, string $name, int $time, int $days, int $si) {
    $this->courseId = $courseId;
    $this->name = $name;
    $this->time = $time;
    $this->days = $days;
    $this->si = $si;
  }
}

function view_courses(PDO $conn) {
  $stmt = $conn->prepare("SELECT * FROM course");

  $stmt->execute();

  $courseList = array();

  foreach ($stmt as $row)
  {
    $course_id = intval($row['courseid']);
    $name = intval($row['name']);
    $time = $row['time'];
    $days = intval($row['days']);
    $si = intval($row['SI']);
    
    $course = new Course($course_id, $name, $time, $days, $si);
    array_push($courseList, $course);
  }

  echo json_encode($courseList);
}

try {
  $conn = connect_to_database();
  view_courses($conn);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
