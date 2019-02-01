<?php
Include("CommonFunctions.php");
$myArray = array();

if(isset($_GET["userId"])){

$userId = $_GET["userId"];
$query = "SELECT C.uniqueItemID, M.foodName, M.price FROM Menu M, CurrentOrders C WHERE C.foodID = M.foodID AND C.userID =" . $userId;

$result = mysqli_query($con, $query);

$inc = 0;
while($row = $result->fetch_assoc()) {
  $id = $row["uniqueItemID"];
  $extras = get_extras($id,$con);
  $removed= get_removed($id,$con);
  $price = 0.0;
  for($i = 0; $i < sizeof($extras); $i++){
    $price = $price + $extras[$i]['price'];
  }
  $price = $price + $row["price"];
  $jsonArrayObject = (array('food' => $row["foodName"], 'price' => $row["price"], 'extras'=>$extras, 'removed'=>$removed, 'total-price'=>$price));
  $myArray[$inc] = $jsonArrayObject;
  $inc++;
}
  echo json_encode($myArray);
  }

function get_extras($itemId,$con){
  $extras = array();
  $query = "SELECT  I.ingredientCode ,I.ingredient, O.price FROM AddIngredients A, Ingredients I, IngredientOptions O WHERE A.ingredientCode = I.ingredientCode AND A.ingredientCode = O.ingredientCode AND A.UniqueItemID =" . $itemId;
  $result = mysqli_query($con, $query);
  $i = 0;
  while($row = $result->fetch_assoc()) {
    $jsonObjectArray = (array('ingredientId' => $row["ingredientCode"], 'ingredient' => $row["ingredient"], 'price'=>$row["price"]));
    $extras[$i] =$jsonObjectArray;
    $i++;
  }
  return $extras;
}

function get_removed($itemId,$con){
  $removed = array();
  $query = "SELECT  I.ingredientCode ,I.ingredient, O.price FROM RemoveIngredients R, Ingredients I, IngredientOptions O WHERE R.ingredientCode = I.ingredientCode AND R.ingredientCode = O.ingredientCode AND R.UniqueItemID =" . $itemId;
  $result = mysqli_query($con, $query);
  $i = 0;
  while($row = $result->fetch_assoc()) {
    $jsonObjectArray = (array('ingredientId' => $row["ingredientCode"], 'ingredient' => $row["ingredient"], 'price'=>$row["price"]));
    $removed[$i] =$jsonObjectArray;
    $i++;
  }
  return $removed;
}

 ?>
