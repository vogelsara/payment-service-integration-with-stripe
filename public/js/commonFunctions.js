function getShoppingCartName() {
    return "shoppingCart";
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    makeRequest("GET", "/cart", {}, function(responseText) {
        let productNumberIndicator = document.getElementById("number-of-chosen-products");
        let shoppingCart = JSON.parse(responseText);
        productNumberIndicator.innerText = shoppingCart.length;
    })
}

function makeRequest(method, url, body, onResponse) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && parseInt(this.status/100) == 2) {
            onResponse(this.responseText);
        }
    }
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(body));
}