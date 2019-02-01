<?php
Include("CommonFunctions.php");

AddSession();

$userId = $_GET['userId'];
$foodId = $_GET['foodId'];

if($userId != null && $foodId != null){
$query = "INSERT INTO CurrentOrders (userID, foodID) VALUE (". $userId .", ". $foodId .")";
$result = mysqli_query($con, $query);

echo "{}";
}
  
  
  function AddSession(){
  global $con;
  
	$id = $_GET['userId'];
	$query = "INSERT INTO UserSession (userID, sessionStart) VALUES (".$id.", CURRENT_TIMESTAMP()) ON DUPLICATE KEY UPDATE sessionStart = CURRENT_TIMESTAMP()";
	$result = mysqli_query($con, $query);
  }

 ?>