
function initShoppingCart() {
    
    if (!(getShoppingCartName() in localStorage)) {
        localStorage.setItem(getShoppingCartName(), "[]");
    }
    var productInCart = localStorage.getItem(getShoppingCartName());
    var productCartList = JSON.parse(productInCart);
    
    updateNumberOfChosenProducts();
    ProductsInKundvagnWebPage(productCartList);
    countTotalPrice();
    displayTheLoggedInUsername();
    createFinishShoppingCardButton()
    // //hide register/login from the begning as soon script loads. The to add is on loging for both sites
    document.getElementById("loginButton").style.display = "none";
}

// Update the indicator in the navigation bar
function updateNumberOfChosenProducts() {
    var productNumberIndicator = document.getElementById("number-of-chosen-products");
    var shoppingCartString = localStorage.getItem(getShoppingCartName());
    var shoppingCartJson = JSON.parse(shoppingCartString);
    productNumberIndicator.innerText = shoppingCartJson.length;
    
}

function ProductsInKundvagnWebPage (productCartList) {
    var divForHeader;
    var divForTheProductCartList = document.createElement("div");
    var divForAllProductsInRow = document.createElement("div");
    var mainStuff = document.getElementById("mainContent");
    
    divForHeader = shoppingCartHeader();
    divForAllProductsInRow = divProductRow();

    for(var i = 0; i < productCartList.length; i++) {
        
        divForSingleProduct = productDiv();
        createImageFromProductList(productCartList[i]);
        createTitleFromProductList(productCartList[i]);
        createPriceFromProductList(productCartList[i]);
        createDeleteButton(productCartList[i]);
        

        divForAllProductsInRow.appendChild(divForSingleProduct)
    }
    divForTheProductCartList.appendChild(divForAllProductsInRow);
   
    //add header and all products to main.
    mainStuff.appendChild(divForHeader);
    mainStuff.appendChild(divForAllProductsInRow);
}

//Header for "kundvagn.html"
function shoppingCartHeader() {
    var cartHeader = document.createElement("div");
    var cartTitle = document.createElement("h1");
    cartHeader.classList.add("container", "text-center", "font-weight-bold");
    cartTitle.innerHTML = '<i class="fas fa-shopping-cart"></i>' + "Kundvagn";
    cartTitle.classList.add("h1-kundvagn");
    cartHeader.appendChild(cartTitle);
    return cartHeader;
}

function divProductRow() {
    AllProductsRow = document.createElement("div");
    AllProductsRow.classList.add("container-fluid", "flex-wrap", "d-flex");
    return AllProductsRow;
}

function productDiv() {
    var oneProductDiv = document.createElement("div");
    oneProductDiv.classList.add("d-flex", "flex-column", "align-items-center", "divProduct", "pb-3");
    AllProductsRow.appendChild(oneProductDiv);
    return oneProductDiv;
}

function createImageFromProductList(productCartList) {
    var imageProduct = document.createElement("img");
    imageProduct.classList.add("wideImg");
    imageProduct.src = productCartList.image;
    divForSingleProduct.appendChild(imageProduct);
}

function createTitleFromProductList(productCartList) {
    var titleProduct = document.createElement("h1");
    titleProduct.classList.add("font-weight-bold");
    titleProduct.innerText = productCartList.title;
    divForSingleProduct.appendChild(titleProduct);
    return titleProduct;
}

function createPriceFromProductList(productCartList) {
    var priceProduct = document.createElement("h5");
    priceProduct.classList.add("font-weight-bold");
    priceProduct.innerText = productCartList.price + "kr";
    divForSingleProduct.appendChild(priceProduct);
    return priceProduct;
}

//create delete button here
function createDeleteButton(productCartList) {
    var deleteButton = document.createElement("button");
    var spanForDeleteButtonText = document.createElement("span");
    var spanForDeleteButtonIcon = document.createElement("span");

    spanForDeleteButtonIcon.innerHTML = '<i class="far fa-trash-alt"></i>';
    spanForDeleteButtonText.innerText = "Ta bort";
    deleteButton.classList.add("btn-sm", "deleteButton", "btn");
    deleteButton.onclick = function() { deleteButtonClick(productCartList) };

    deleteButton.appendChild(spanForDeleteButtonIcon);
    deleteButton.appendChild(spanForDeleteButtonText);
    divForSingleProduct.appendChild(deleteButton);
    return deleteButton;
}

//create delete function here
function deleteButtonClick(productCartList) {

    var ItemToDelete = localStorage.getItem(getShoppingCartName());
    var deleteProduct = JSON.parse(ItemToDelete);
    var index = 0;
    
    //deletes the specific product based on its property Idnr.
    for(var i = 0; i < deleteProduct.length; i++) {
        if(productCartList.IdNr == deleteProduct[i].IdNr) {
           index = i;
        }
    };
    
    deleteProduct.splice(index, 1);
    localStorage.setItem(getShoppingCartName(), JSON.stringify(deleteProduct));
 
    // clear content in main.
    document.getElementById("mainContent").innerHTML = "";
    //reload shoppingcart
    initShoppingCart();
};

function countTotalPrice(){
    /* we get the string array from localstorage and parse it to js array
    we get the price of each obj and sum them and put in the body
     */
    var totalPrice = 0;
    var choosenProducts = localStorage.getItem(getShoppingCartName());
    var choosenProductsToArray = JSON.parse(choosenProducts);
    choosenProductsToArray.forEach(function(product){
        totalPrice += product.price;
    }); 
    var divForTotalPrice = document.createElement("div");
    divForTotalPrice.classList.add("text-center")
    var h3ForTotal = document.createElement("h3")
    h3ForTotal.classList.add("h3ForTotal");
    h3ForTotal.innerText = "Totalt Pris: " + totalPrice + " kr";
    divForTotalPrice.appendChild(h3ForTotal);
    var main = document.getElementById("mainContent");
    main.appendChild(divForTotalPrice)
    return divForTotalPrice
}
function createFinishShoppingCardButton(){
    var divForButton = document.createElement("div")
    divForButton.classList.add("text-center")
    var button = document.createElement("button");
    var checkSymbol = document.createElement("span")
    var text= document.createElement("span")
    button.appendChild(checkSymbol)
    button.appendChild(text)
    checkSymbol.innerHTML ='<i class="fas fa-check"></i>';
    text.innerText ="Slutför ditt köp";
    button.classList.add("shopping-button", "btn-sm", "fButton");
    var mainDiv = document.getElementById("mainContent");
    divForButton.appendChild(button)
    mainDiv.appendChild(divForButton)

    button.setAttribute("onclick", "makeEmptyShoppingCart()")
    return button
}

function makeEmptyShoppingCart(){
    if ((getShoppingCartName() in localStorage)) {
        localStorage.setItem(getShoppingCartName(), "[]");
        updateNumberOfChosenProducts()
        var theMainContainer = document.getElementById("mainContent");
        theMainContainer.innerHTML = ""
        
        
        var divForThanks  =document.createElement("div")
        divForThanks.classList.add("text-center", "displayMessageSluförDittKöp")
        var h1 = document.createElement("p")
        h1.innerText = "Tack för ditt köp!"
        divForThanks.appendChild(h1)
        var mainDiv = document.getElementById("mainContent");
        mainDiv.appendChild(divForThanks)
        

    }
   
}
function displayTheLoggedInUsername() {
    var loggedInUserDivs = document.getElementsByClassName('loggedInUsernameDiv');
    var loggedInUsername = localStorage.getItem("loggedInAs");
    
    for(var i = 0; i < loggedInUserDivs.length; i++){
        var loggedInUserDiv = loggedInUserDivs[i];
        if (!(loggedInUsername === "")) {
            loggedInUserDiv.innerText = "Hi, " + loggedInUsername + "!";
            document.getElementById("logoutButton").style.display = "inline-block";
            document.getElementById("loginButton").style.display = "none";
        } else {
            document.getElementById("logoutButton").style.display = "none";
            document.getElementById("loginButton").style.display = "inline-block";
        }
    }
}

function getShoppingCartName() {
    var loggedInUsername = localStorage.getItem("loggedInAs");
    return "shoppingCart" + loggedInUsername;
}
