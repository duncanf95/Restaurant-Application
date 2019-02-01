

function InsertCategories(obj){

  htmlEntry = "<p><a href='MenuItems.html?itemId=" + obj['itemId'] + "' class='button button-big'>"+ obj["item"] +"</a></p>";
  $$(".main-menu-items").append(htmlEntry);
}

function InsertMenuItems(obj){

  id = obj["id"];
  name= obj["foodName"];
  price = obj["price"];
  ingredients = obj["ingredients"];
  allergy = obj["allergy"];

  allergyString = "";
  if(allergy.length > 0){
    allergyString = "<p>Allergy Information</br> Contains: ";
    for(i =0; i<allergy.length; i++){
      allergyString += allergy[i]["allergy"] + ", ";
    }
    allergyString += "</p>";
  }


  htmlEntry = "<li class='accordion-item' id = "+ id +"><a href='#' class='item-content item-link'>\
      <div class='item-inner'>\
        <div class='item-title'>"+ name +"</div><div class='item-price' price= "+ price + "> £" + price + "</div>\
      </div></a>\
    <div class='accordion-item-content'>\
      <div class='content-block food-dropdown'>\
      <p>"+ createIngredientDisplay(ingredients, id) +"</p>\
      "+ allergyString +"\
      <p><a href='#' class='button button-big button-fill color-gray edit-button'>Add to Order</a></p>\
      </div>\
    </div>\
  </li>";

  $$(".menu-items ul").append(htmlEntry);
}

function createIngredientDisplay(data){

  ingredientString = "";

  for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        id = obj["ingredientId"];
        name = obj["ingredient"];
        //$$(".current-orders ul").append(id = obj["ingredient"]);
        htmlEntry = "<div class = 'content-block food-dropdown' value = "+ id +">+ " + name +"</div>";

        ingredientString += htmlEntry;
      }
      return ingredientString;
}

function extraDisplay(data){

  ingredientString = "";
  htmlEntry = "<p class = 'extra-items'>Extras:</p>"

  for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        id = obj["ingredientId"];
        name = obj["ingredient"];
        price = obj["price"];
        //$$(".current-orders ul").append(id = obj["ingredient"]);
        htmlEntry += "<div class = 'qr-description' value = "+ id +">+ " + name +": £"+price+"</div>";

        ingredientString += htmlEntry;
      }
      return ingredientString;
}

function removedDisplay(data){

  ingredientString = "";
  htmlEntry = "<p class = 'extra-items'>Removed:</p>"

  for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        id = obj["ingredientId"];
        name = obj["ingredient"];
        price = obj["price"];
        //$$(".current-orders ul").append(id = obj["ingredient"]);
        htmlEntry += "<div class = 'qr-description' value = "+ id +">- " + name +"</div>";

        ingredientString += htmlEntry;
      }
      return ingredientString;
}

function InsertOrderItems(obj){

    name = obj["food"];
    price = obj["price"];
    extras = obj["extras"]
    removed = obj["removed"];


      entry = "<li class='item-content'>\
          <div class='item-inner'>\
            <div class='item-title'>"+ name +"</div>\
            <div class='item-after'>"+ price +"</div>\
            </div>\
            </li>";






      $$(".current-orders ul").append(entry);
    if(extras.length > 0){
      $$(".current-orders ul").append("<li>"+ extraDisplay(extras) +"</li>");
    }
    if(removed.length > 0){
      $$(".current-orders ul").append("<li>"+ removedDisplay(removed) +"</li>");
    }
}

function DisplayOrder(basket){

  for (var i = 0; i < basket.length; i++) {

      name = basket[i]["name"];
      price = basket[i]["price"];

      entry = "<li class='swipeout'>\
        <div class='swipeout-content item-content'>\
          <div class='item-inner'>" + name + "</div>\
          <div class='item-inner'>£"+ price +"</div>\
        </div>\
        <div class='swipeout-actions-right'>\
          <a href='#' class='swipeout-delete remove-food'>Remove</a>\
        </div>\
      </li>";

      $$(".order-list ul").append(entry);
  }
}
