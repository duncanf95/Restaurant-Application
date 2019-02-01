<?php
Include("CommonFunctions.php");

if(isset($_GET["userId"]) && isset($_GET["time"])){

$userId = $_GET['userId'];
$time = $_GET["time"];

$query = "INSERT INTO OrderTime (UserID, waitTimeMinutes) VALUES (".$userId.",  (SELECT waitTimeMinutes FROM AverageWaitTime)) ON DUPLICATE KEY UPDATE waitTimeMinutes = ".  $time;

$result = mysqli_query($con, $query);

echo "{}";
}

 ?>