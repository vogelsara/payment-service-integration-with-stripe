function placeOrder() {
    makeRequest("POST", "/order", {}, function(responseText) {});
}