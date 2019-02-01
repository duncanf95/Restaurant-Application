
function GetCategories(){
$$.ajax({
  url: "http://159.65.18.23/OrderingSystem/GetCategories.php",
  type: 'GET',
  dataType: "json",
  success: function(data) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      InsertCategories(obj);
    }
    }
});
}

function GetFoodItems(id){
$$.ajax({
  url: "http://159.65.18.23/OrderingSystem/GetMenuItems.php",
  type: 'GET',
  dataType: "json",
  data: {
    catId: id
  },
  success: function(data) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      InsertMenuItems(obj);
    }
    }
});
}

function GetCurrentOrders(id){
  $$(".current-orders ul .item-content").remove();
  p = 0.0;
$$.ajax({
  url: "http://159.65.18.23/OrderingSystem/GetCustomerOrders.php",
  type: 'GET',
  dataType: "json",
  data: {
    userId: id
  },
  success: function(data) {
    $$(".current-orders ").html("<ul></ul>");
    for (var i = 0; i < data.length; i++) {

      var obj = data[i];
      InsertOrderItems(obj);

        p = p + parseFloat(obj["total-price"]);
    }

    $$(".total-price").text("Total: £"+p.toFixed(2));
    }
});

}

function GetOrderStatus(id){
  $$.ajax({
    url: "http://159.65.18.23/OrderingSystem/GetOrderStatus.php",
    type: 'GET',
    dataType: "json",
    data: {
      userId: id
    },
    success: function(data) {
      waitTime = data[0]["time"];
      status = data[0]["status"];

        imgEntry = '<img src="img/tick.png" alt="" width = 25>';
        crossEntry = '<img src="img/cross.png" alt="" width = 25>';

      // if statement to check status of the order and change tracker to match
      if(status == 'start'){
      $$(".start-img").html(imgEntry);
      $$(".prep-img").html(crossEntry);
      $$(".done-img").html(crossEntry);
      }else if (status == 'prep') {
      $$(".start-img").html(imgEntry);
      $$(".prep-img").html(imgEntry);
      $$(".done-img").html(crossEntry);
      }else if (status == 'ready') {
      $$(".start-img").html(imgEntry);
      $$(".prep-img").html(imgEntry);
      $$(".done-img").html(imgEntry);
    }

    $$(".estimated-time").html("Expected wait: "+waitTime+" minutes");


      }
  });
}
