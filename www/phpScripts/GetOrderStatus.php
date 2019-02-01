<?php
Include("CommonFunctions.php");
$myArray = array();

if(isset($_GET["userId"])){

$userId = $_GET["userId"];
$query = "SELECT T.waitTimeMinutes, S.orderStatus FROM OrderStatus S, OrderTime T WHERE S.UserId = T.userId AND T.userID =" . $userId;

$result = mysqli_query($con, $query);

$inc = 0;
while($row = $result->fetch_assoc()) {
  $jsonArrayObject = (array('status' => $row["orderStatus"], 'time' => $row["waitTimeMinutes"]));
  $myArray[$inc] = $jsonArrayObject;
  $inc++;
}
  echo json_encode($myArray);
  }

 ?>