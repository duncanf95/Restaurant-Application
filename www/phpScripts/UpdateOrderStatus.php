<?php
Include("CommonFunctions.php");

if(isset($_GET["userId"]) && isset($_GET["status"])){

$userId = $_GET['userId'];
$status = $_GET["status"];

$query = "INSERT INTO OrderStatus (UserID, orderStatus) VALUES (".$userId.", '". $status ."') ON DUPLICATE KEY UPDATE orderStatus = '". $status ."'";

$result = mysqli_query($con, $query);

echo "{}";
}

 ?>