<?php
include "database.php";

class SI {
  public int $student_id;
  public string $name;
  public int $time;
  public int $day;

  public function __construct(int $student_id, string $name, int $time, int $day) {
    $this->student_id = $student_id;
    $this->name = $name;
    $this->time = $time;
    $this->day = $day;
  }
}

function view_sis_with_conflicts(PDO $conn) {
  $stmt = $conn->prepare("SELECT * FROM student
    LEFT JOIN conflict ON conflict.student = student.studentid");

  $stmt->execute();

  $siList = array();

  foreach ($stmt as $row)
  {
    $student_id = intval($row['studentid']);
    $name = $row['name'];
    $time = intval($row['time']);
    $day = intval($row['day']);

    $si = new SI($student_id, $name, $time, $day);
    array_push($siList, $si);
  }

  echo json_encode($siList);
}

try {
  $conn = connect_to_database();
  view_sis_with_conflicts($conn);
} catch(PDOException $e) {
    http_response_code(500); 
    die("{ \"success\": false, \"error\": \"" . $e->getMessage() . "\" }");
} finally {
  $conn = null;
}
?>
