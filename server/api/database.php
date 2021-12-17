<?php
function connect_to_database() {
  $servername = "localhost";
  $username = "user3";
  $password = "userpwd3";
  $dbname = "AgileExpG3";

  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  return $conn;
}
?>
