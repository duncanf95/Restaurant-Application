<?php
Include("CommonFunctions.php");
$UserID = $_GET["userId"];
$query = 'SELECT uniqueItemID, foodID FROM CurrentOrders WHERE userId = '. $UserID ;

$price = 0.0;

$foodItems = mysqli_query($con, $query);
$i = 0;
$ings = 0;
$prce = 0;
if($foodItems->num_rows > 0){
  $check = $i;
  $fprice=0;

  $objects = [$foodItems->num_rows];
	while($foodRow = $foodItems->fetch_assoc()) {
    $jsonObjectArray = array('itemNo'=>-1,'name'=>'', 'price'=>-1);
    $name = '';
    $price = -1;
    $query = 'SELECT ingredientCode FROM AddIngredients WHERE uniqueItemID = '. $foodRow["uniqueItemID"];
		$ingredients = mysqli_query($con, $query);
    $query = 'SELECT price FROM `OrderingSystem`.`Menu` WHERE `foodID` ='. $foodRow["foodID"];
    $foodprice = mysqli_query($con, $query);
    while($fpRow = $foodprice->fetch_assoc()){
      $fprice = $fprice+(float)$fpRow["price"];
    }
    while($ingredientRow = $ingredients->fetch_assoc()) {
      $query = 'SELECT price FROM IngredientOptions WHERE ingredientCode = '. $ingredientRow["ingredientCode"];
      $ingPrices = mysqli_query($con, $query);
      while($priceRow = $ingPrices->fetch_assoc()) {
        $query = 'SELECT ingredient FROM Ingredients WHERE ingredientCode = '. $ingredientRow["ingredientCode"];
        $ingNames = mysqli_query($con, $query);
        while($nameRow = $ingNames->fetch_assoc()) {

          $name = $nameRow["ingredient"];
        }
        $price = $priceRow["price"];
        $fprice = $priceRow["price"] + $fprice;
      }
      $jsonObjectArray = (array('itemNo'=>$ings,'name'=>$name, 'price'=>$price));
      $objects[$i] = $jsonObjectArray;
      $i++;
    }
    if($check==$i){
      $objects[$i] = $jsonObjectArray;
      $i++;
    }
    //$price = $price+$fpRow["price"];
    $ings++;

	}
  $jsonObjectArray = (array('itemNo'=>-1,'name'=>"", 'price'=>$fprice));
  $objects[$foodItems->num_rows] = $jsonObjectArray;
  echo json_encode($objects);

}else{
  echo 0;
}

 ?>
