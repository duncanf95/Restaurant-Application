<?php
Include("CommonFunctions.php");
$myArray = array();

$query = "Select foodCategory, categoryNumber FROM FoodCategory";

$result = mysqli_query($con, $query);

$inc = 0;
while($row = $result->fetch_assoc()) {
  $jsonArrayObject = (array('item' => $row["foodCategory"], 'itemId' => $row["categoryNumber"]));
  $myArray[$inc] = $jsonArrayObject;
  $inc++;
}
  echo json_encode($myArray);

 ?>
