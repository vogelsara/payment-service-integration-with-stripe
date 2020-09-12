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

function makeRequest(method, url, body, onResponse) {
    console.log("Legaläbb a make requestbe bejottunk");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && parseInt(this.status/100) == 2) {
          console.log("Itt vagyunk a 200.as valaszban");
          onResponse(this.responseText);
        }
    }
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(body));
}