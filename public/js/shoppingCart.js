function initShoppingCart() {  
    makeRequest("GET", "/cart", {}, function(responseText) {
        document.getElementById("mainContent").innerHTML = "";
        let shoppingCart = JSON.parse(responseText);
        console.log(shoppingCart);
        updateNumberOfChosenProducts();
        addShoppingCartTitleToMainContainer();
        addProductsToShoppingCartPage(shoppingCart);
        addTotalPriceToMainContainer(shoppingCart);
        addCheckoutButtonToMainContainer();
    });
}

function addShoppingCartTitleToMainContainer() {
    let cartHeader = document.createElement("div");
    cartHeader.classList.add("container", "text-center", "font-weight-bold");
    
    let cartTitle = document.createElement("h1");
    cartTitle.innerHTML = '<i class="fas fa-shopping-cart"></i>' + "Shopping cart";
    cartTitle.classList.add("h1-cart");
    cartHeader.appendChild(cartTitle);

    let mainContainer = document.getElementById("mainContent");
    mainContainer.appendChild(cartHeader);
}

function addProductsToShoppingCartPage(productCartList) {
    let mainStuff = document.getElementById("mainContent");
    let allProductsContainer = createAllProductsContainer();

    for(var i = 0; i < productCartList.length; i++) {
        let divForSingleProduct = createProductDiv();
        let currentProduct = productCartList[i];

        divForSingleProduct.appendChild(createProductImage(currentProduct));
        divForSingleProduct.appendChild(createProductTitle(currentProduct));
        divForSingleProduct.appendChild(createProductPrice(currentProduct));
        divForSingleProduct.appendChild(createDeleteButton(currentProduct));
        
        allProductsContainer.appendChild(divForSingleProduct)
    }
   
    mainStuff.appendChild(allProductsContainer);
}

function createAllProductsContainer() {
    let productRow = document.createElement("div");
    productRow.classList.add("container-fluid", "flex-wrap", "d-flex");
    return productRow;
}

function createProductDiv() {
    let oneProductDiv = document.createElement("div");
    oneProductDiv.classList.add("d-flex", "flex-column", "align-items-center", "divProduct", "pb-3");
    return oneProductDiv;
}

function createProductImage(product) {
    let productImge = document.createElement("img");
    productImge.classList.add("wideImg");
    productImge.src = product.image;
    return productImge;
}

function createProductTitle(product) {
    let productTitle = document.createElement("h1");
    productTitle.classList.add("font-weight-bold");
    productTitle.innerText = product.title;
    return productTitle;
}

function createProductPrice(product) {
    let productPrice = document.createElement("h5");
    productPrice.classList.add("font-weight-bold");
    productPrice.innerText = product.price + "kr";
    return productPrice;
}

function createDeleteButton(product) {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-sm", "deleteButton", "btn");
    deleteButton.onclick = function() { onDeleteButtonClick(product) };

    let spanForDeleteButtonText = document.createElement("span");
    spanForDeleteButtonText.innerText = "Remove";
    deleteButton.appendChild(spanForDeleteButtonText);

    let spanForDeleteButtonIcon = document.createElement("span");
    spanForDeleteButtonIcon.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteButton.appendChild(spanForDeleteButtonIcon);
    
    return deleteButton;
}

function onDeleteButtonClick(itemToDelete) {
    makeRequest("DELETE", `/cart/${itemToDelete["id"]}`, {}, function(responseText) {
        initShoppingCart();
    });
};

function addTotalPriceToMainContainer(shoppingCart) {
    let divForTotalPrice = document.createElement("div");
    divForTotalPrice.classList.add("text-center");

    let h3ForTotal = document.createElement("h3");
    h3ForTotal.classList.add("h3ForTotal");
    h3ForTotal.innerText = "Total price: " + calculateTotalPrice(shoppingCart) + " kr";
    divForTotalPrice.appendChild(h3ForTotal);

    let main = document.getElementById("mainContent");
    main.appendChild(divForTotalPrice);
}

function calculateTotalPrice(shoppingCart) {
    let totalPrice = 0;
    shoppingCart.forEach(function(product){
        totalPrice += product.price;
    });
    return totalPrice;
}

function addCheckoutButtonToMainContainer(){
    let checkoutButton = document.createElement("button");
    checkoutButton.classList.add("shopping-button", "btn-sm", "fButton");
    checkoutButton.setAttribute("onclick", "onCheckoutButtonClick()");

    let checkSymbol = document.createElement("span");
    checkSymbol.innerHTML ='<i class="fas fa-check"></i>';
    checkoutButton.appendChild(checkSymbol);

    let text = document.createElement("span");
    text.innerText ="Go to checkout";
    checkoutButton.appendChild(text);
    
    let checkoutButtonContainer = document.createElement("div");
    checkoutButtonContainer.classList.add("text-center");
    checkoutButtonContainer.appendChild(checkoutButton);
    
    let mainDiv = document.getElementById("mainContent");
    mainDiv.appendChild(checkoutButtonContainer);
}

function onCheckoutButtonClick() {
    var stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

    fetch("/create-session", {
        method: "POST",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            // If redirectToCheckout fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using error.message.
            if (result.error) {
            alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
}
