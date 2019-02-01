<?php
Include("CommonFunctions.php");
$myArray = array();

$catId = $_GET["catId"];

$query = "SELECT foodID, foodName, price FROM Menu WHERE foodCategory =" . $catId;

$result = mysqli_query($con, $query);

$inc = 0;
while($row = $result->fetch_assoc()) {
  $jsonArrayObject = (array('id' => $row["foodID"], 'foodName' => $row["foodName"], 'price' => $row["price"], 'ingredients' => GetIngredients($row["foodID"])));
  $myArray[$inc] = $jsonArrayObject;
  $inc++;
}
  echo json_encode($myArray);
  
  
  
  function GetIngredients($id){
	global $con;
	$ingredients = array();
	
	$query = "Select I.ingredient, I.ingredientCode FROM Ingredients I, MenuIngredients MI WHERE ". $id ." = MI.foodID AND MI.ingredientID = I.ingredientCode";

	$result = mysqli_query($con, $query);

	$inc = 0;
	while($row = $result->fetch_assoc()) {
		$jsonArrayObject = (array('ingredientId' => $row["ingredientCode"], 'ingredient' => $row["ingredient"]));
		$ingredients[$inc] = $jsonArrayObject;
		$inc++;
	}
	
	return $ingredients;
  }

 ?>
