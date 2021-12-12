<?php

class Course {
  public $time; // Int
  public $days; // Set {'M','T','W','Th','F'}
  public $name; // String

  function get_time($time) {
    return $this->time;
  }

  function get_days($days) {
    return $this->days;
  }

  function get_name($name) {
    return $this->name;
  }

  public function __construct($time, $days, $name) {
    validate_course($time, $days, $name);

    $this->time = $time;
    $this->days = $days;
    $this->name = $name;
  }

  private function validate_course($time, $days, $name) {
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
}

class Conflict {
  public $student; // Int Foreign Key
  public $time; // Int
  public $day; // Int i.e. 0-4 means M-F

  function get_student($student) {
    return $this->student;
  }

  function get_time($time) {
    return $this->time;
  }

  function get_day($day) {
    return $this->day;
  }

  public function __construct($student, $time, $day) {
    validate_conflict($student, $time, $day);

    $this->student = $student;
    $this->time = $time;
    $this->day = $day;
  }

  private function validate_conflict($student, $time, $day) {
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
}
?>