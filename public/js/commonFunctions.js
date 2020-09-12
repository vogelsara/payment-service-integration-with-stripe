function getShoppingCartName() {
    return "shoppingCart";
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    let productNumberIndicator = document.getElementById("number-of-chosen-products");
    let shoppingCartString = localStorage.getItem(getShoppingCartName());
    let shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
}