<?php
include "database.php";

class Course {
  public int $course_id;
  public int $name;
  public string $time;
  public int $days;
  public int $si;

  public function __construct(int $course_id, string $name, int $time, int $days, int $si) {
    $this->course_id = $course_id;
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
    $course = new Course($row['courseid'], $row['name'], $row['time'], $row['days'], $row['si']);
    array_push($courseList, $course);
  }

  echo json_encode($courseList);
}

try {
  $conn = connect_to_database();
  view_courses($conn);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"$e->getMessage()\" }");
} finally {
  $conn = null;
}
?>
