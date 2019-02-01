<?php
Include("CommonFunctions.php");

if (isset($_GET["Fname"]) && isset($_GET["Sname"])
    && isset($_GET["email"]) && isset($_GET["password"])
    && isset($_GET["Gender"] && isset($_GET["Gender"])) {

$Fname = $_GET["Fname"];
$Sname = $_GET["Sname"];
$email = $_GET["email"];
$password = $_GET["password"];
$conPass = $GET["conPass"];
$Gender = $_GET["Gender"];


if($password == $GET["conPass"])
{
$query = 'INSERT INTO User (firstName, surname, password, email, gender) VALUES ("'.$Fname.'", "'.$Sname.'", "'.$password.'", "'.$email.'", "'.$Gender.'")';
$result = mysqli_query($con, $query);
if($result === TRUE){
	echo 1;

}else{
  echo 0;
}


}else{
  echo 0;
}
}else{
  echo 0;
}



 ?>
