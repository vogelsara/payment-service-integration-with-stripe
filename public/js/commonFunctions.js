
function getShoppingCartName() {
    return "shoppingCart";
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem(getShoppingCartName());
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
}