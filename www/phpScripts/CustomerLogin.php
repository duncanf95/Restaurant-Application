<?php
Include("CommonFunctions.php");

if (isset($_GET["email"]) && isset($_GET["password"])) {
$email = $_GET["email"];
$password = $_GET["password"];

$query = "Select userID FROM User WHERE email = '". $email ."' AND password ='" . $password. "'";

$result = mysqli_query($con, $query);
if($result->num_rows > 0){
	while($row = $result->fetch_assoc()) {
		echo $row["userID"];
	}
}else{
  echo 0;
}

}else{
  echo 0;
}



 ?>
