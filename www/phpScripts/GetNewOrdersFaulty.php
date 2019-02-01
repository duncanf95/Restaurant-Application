<?php
$con = mysqli_connect("159.65.18.23", "App", "stummybeige", "OrderingSystem");

if (!$con) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$myArray = array();
$query = "SELECT MAX(uniqueItemID) FROM CurrentOrders;";
$result = mysqli_query($con, $query);
$row=$result->fetch_assoc();
$maxID =(int)$row['MAX(uniqueItemID'];

$query = "SELECT ID FROM LastKnownID;";
$result = mysqli_query($con, $query);
$row=$result->fetch_assoc();
$lastID =(int)$row['ID'];



$query4 = ("SELECT C.uniqueItemID, C.userID, M.foodName FROM Menu M, CurrentOrders C WHERE C.foodID = M.foodID AND C.uniqueItemID > '$lastID' UNION SELECT T.uniqueItemID, T.TableNumber, M.foodName FROM Menu M, CurrentTableOnlyOrders T WHERE T.foodID = M.foodID AND T.uniqueItemID > '$lastID' ORDER BY uniqueItemID;");
$result = mysqli_query($con, $query4);


$query3 = ("UPDATE LastKnownID SET ID='$maxID'");
mysqli_query($con, $query3);


$inc = 0;
while($row = $result->fetch_assoc()) {
  $jsonArrayObject = (array('foodName' => $row["foodName"],'userID' => $row["userID"],'uniqueItemID' => $row["uniqueItemID"] ));
  $myArray[$inc] = $jsonArrayObject;
  $inc++;
}

echo json_encode($myArray);

 ?>
