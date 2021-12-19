<?php
include "database.php";

class Conflict {
  public int $time;
  public int $day;

  public function __construct(int $time, int $day) {
    $this->time = $time;
    $this->day = $day;
  }
}

class SI {
  public int $studentId;
  public string $name;
  public array $conflicts = array();

  public function __construct(int $studentId, string $name) {
    $this->studentId = $studentId;
    $this->name = $name;
    $this->conflicts = array();
  }

  public function add_conflict(Conflict $conflict) {
    $this->conflicts = array(...$this->conflicts, $conflict);
  }
}

function view_sis_with_conflicts(PDO $conn) {
  $stmt = $conn->prepare("SELECT * FROM student
    LEFT JOIN conflict ON conflict.student = student.studentid");

  $stmt->execute();

  $siList = array();

  $index = 0;
  foreach ($stmt as $row)
  {
    $student_id = intval($row['studentid']);
    $name = $row['name'];
    $time = intval($row['time']);
    $day = intval($row['day']);

    $conflict = new Conflict($time, $day);
    if ($index > 0 && $siList[$index - 1]->studentId === $student_id) {
      $siList[$index - 1]->add_conflict($conflict);
    } else {
      $si = new SI($student_id, $name);
      if ($time > 0) {
        $si->add_conflict($conflict);
      }
      array_push($siList, $si);
    }
    $index++;
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
