<?php
Include("CommonFunctions.php");
$UserID = $_GET["userId"];
$query = 'INSERT INTO WaiterAlerts (CustomerID) VALUES('.$UserID.')';

$result = mysqli_query($con, $query);
if($result === TRUE){
	echo 1;

}else{
  echo 0;
}

?>
