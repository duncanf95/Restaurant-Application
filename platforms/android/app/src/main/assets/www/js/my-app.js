// Initialize app
var myApp = new Framework7();

var UserId = 0;

//basket stuff
var foodInBasket = 0;
var basket = new Array();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

myApp.onPageInit('login', function (page) {

  $$(".login").click(function() { // Activate Function to check login details on login
    CheckLogin();
  });
});

myApp.onPageInit('register', function (page) {

  $$(".register").click(function() { // Activate Function to check login details on login
    ValidateRegister();
  });
});

myApp.onPageInit('Order', function (page) {
  GetCategories(); //Get main menu Categories (from GetContent.js)
  $$(".AlertWaiter").click(function(){
    waiterAlert(); // setup function to allert waiter
  });
});

myApp.onPageInit('Menu', function (page) {
  catId = page.query.itemId; //get the itemId from page url get parameters
  GetFoodItems(catId); //Get main menu Categories (from GetContent.js)
});

myApp.onPageInit('QR', function (page) {

  orderString = UserId;

  if(basket.length > 0){ //the customer has items in the basket
    orderString += ",";
    for(i = 0; i < basket.length; i++){
      orderString += basket[i]["id"] + ",";
    }
  }

  url = "https://api.qrserver.com/v1/create-qr-code/?data="+ orderString +"&amp;size=100x100";
  console.log(url);
  $$(".qr").attr("src",url);
});

myApp.onPageInit('CurrentOrder', function (page) {
  GetCurrentOrders(UserId);
  GetOrderStatus(UserId);
  RefreshOrderStatus();
});

function RefreshOrderStatus(){

if(mainView.activePage.name == "CurrentOrder"){
  setTimeout(function(){
    GetCurrentOrders(UserId);
    GetOrderStatus(UserId);
    RefreshOrderStatus();
    console.log("looped");
  }, 10000);
  }else{
    return;
  }
}


function CheckLogin(){
  mail = $$("#Username").val();
  pass = $$("#Password").val();
$$.ajax({
  url: "http://159.65.18.23/OrderingSystem/CustomerLogin.php",
  type: 'GET',
  dataType: "json",
  data: {
    email: mail,
    password: pass,
  },
  success: function(data) {
      if(data > 0){ //if the user logged in properly
        UserId = data;
        mainView.router.load({ //open the order page
          url: "Order.html",
        });
      }else{
        myApp.alert("Please try again", "login Failed");
      }
    }
});
}

function CheckRegister(){
  Firname = $$("#Fname").val();
  Surname = $$("#Sname").val();
  mail = $$("#email").val();
  password = $$("#Password").val();
  ConfirPass = $$("#ConPass").val();
  Gender_Choice = $$("#Gender").val();
$$.ajax({
  url: "http://159.65.18.23/OrderingSystem/CustomerRegister.php",
  type: 'GET',
  dataType: "json",
  data: {
    Fname: Firname,
    Sname: Surname,
    password: password,
    email: mail,
    Gender: Gender_Choice
  },
  success: function(data) {
    if(password == ConfirPass){
      if(data > 0){ //if the user logged in properly
        mainView.router.load({url:'login.html', ignoreCache:true});
        myApp.alert("Please login.", "Register sucessful.");
      }else{
        myApp.alert("Please try again.", "Register processing failed.");
      }
    }else{
      myApp.alert("Please try again.", "Passwords did not match.");
    }
  }


});
}

function ValidateRegister(){
  Firname = $$("#Fname").val();
  Surname = $$("#Sname").val();
  mail = $$("#email").val();
  password = $$("#Password").val();
  ConfirPass = $$("#ConPass").val();
  Gender_Choice = $$("#Gender").val();

  if(password.length > 6){
    if(password == ConfirPass){
      CheckRegister();
    }else{
      myApp.alert("Please try again.", "Passwords did not match.");
    }
  }else{
    myApp.alert("Please try again.", "Password must be at least 6 characters.");
  }

}

myApp.onPageInit('ViewOrder', function (page) {
  DisplayOrder(basket); //display orders in basket
  totalPrice = calculateTotalPrice();
  if(totalPrice <= 0.0){
    $$('.PlaceOrder').addClass('disabled');
  }
  $$('.remove-food').on('click', function () {
    foodInBasket--;
    myApp.alert("Removed Item", "Success");
    index = $$(this).index();
    basket.splice(index, 1);
    calculateTotalPrice();
  });

  $$(".PlaceOrder").on('click',function(){
    waiterAlert();
  });

});

function calculateTotalPrice(){
  totalPrice = 0.0;

  for(var i = 0; i < basket.length; i++){
    totalPrice += parseFloat(basket[i]["price"]);
  }

  $$(".price").text("Total: £" + totalPrice);

  return totalPrice;
}

function waiterAlert(){

tableNum = 0;

  myApp.prompt('Enter Table Number', "Table Number",
  function (value) {
  if (value.match(/^([0-9]+)$/)){
    tableNum = Number(value);

    $$.ajax({
      url: "http://159.65.18.23/OrderingSystem/alertWaiter.php",
      type: 'GET',
      dataType: "json",
      data: {
        userId: UserId,
        table: tableNum,
      },
      success: function(data) {

        if(data > 0){ //if the user logged in properly
          mainView.router.load({url:'QR.html', ignoreCache:true});
          myApp.alert("Waiter will come scan your QR code shortly.", "Alert Successful.");
        }else{
          myApp.alert("Please try again.", "Alert Failed.");
        }

      }

  });

  }else{
    return;
  }
  },
  function (value) {
    return;
  }
);
}


myApp.onPageInit('*', function (page) {
  $$(".badge").text(foodInBasket);
});

$$(document).on('click', ".edit-button", function() {
  AddToBasket($$(this).parents(".accordion-item").eq(0));
});

function AddToBasket(selector){
  foodInBasket++;
  $$(".badge").text(foodInBasket);

  foodId = $$(selector).attr("id");
  foodName = $$(selector).find(".item-title").text();
  foodPrice = $$(selector).find(".item-price").attr("price");
  food = {id: foodId, name: foodName, price: foodPrice};
  console.log(foodName);
  basket.push(food);
}
