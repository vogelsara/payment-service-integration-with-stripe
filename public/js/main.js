
var listOfProducts;

function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(listOfProducts);
    });
}

function initSite() {
    if (!(getShoppingCartName() in localStorage)) {
        localStorage.setItem(getShoppingCartName(), "[]");
    }
    loadProducts();
    updateNumberOfChosenProducts();
}

function addProductsToWebpage(listOfProducts) {
    let divForThePictures = document.createElement("div");
    divForThePictures.classList.add("container-fluid")

    for(var i = 0; i < listOfProducts.length; i++) {
        divForTheProduct = createProductDiv();

        let currentProduct = listOfProducts[i];
        divForTheProduct.appendChild(createProductName(currentProduct));
        divForTheProduct.appendChild(createProductDescription(currentProduct));
        divForTheProduct.appendChild(createProductImage(currentProduct));
        divForTheProduct.appendChild(createProductPrice(currentProduct));
        divForTheProduct.appendChild(createShoppingButton(currentProduct));
        
        divForThePictures.appendChild(divForTheProduct);
    }
    document.body.appendChild(divForThePictures);
}
    
function createProductDiv() {
    let addingSingleProduct = document.createElement("div");
    addingSingleProduct.classList.add("d-flex", "flex-column", "align-items-center", "pt-5", "backgroundOdd");
    return addingSingleProduct;
}

function createProductName(listOfProducts) {
    let productName = document.createElement("h2");
    productName.innerText = listOfProducts.title;
    productName.classList.add("text-center");
    return productName;
}

function createProductImage(listOfProducts) {
    let productImg = document.createElement("img");
    productImg.classList.add("widthtImg");
    productImg.src = listOfProducts.image;
    return productImg;
}

function createProductPrice(listOfProducts) {
    let productPrice = document.createElement("h3");
    productPrice.innerText = listOfProducts.price +"kr";
    return productPrice;
}

function createProductDescription(listOfProducts) {
    let productDescription = document.createElement("h4");
    productDescription.innerText = listOfProducts.description;
    productDescription.classList.add("text-center");
    return productDescription;
}

function createShoppingButton(listOfProducts) { 
    let shoppingProductButton = document.createElement("button");

    let spanForButtonIcon = document.createElement("span");
    let arrowIcon = document.createElement("i");
    arrowIcon.classList.add("fas", "fa-cart-arrow-down", "own-fa-cart-arrow-down");
    spanForButtonIcon.appendChild(arrowIcon);
    shoppingProductButton.appendChild(spanForButtonIcon);

    let spanForButtonText = document.createElement("span");
    spanForButtonText.innerText = "Add to cart";
    shoppingProductButton.appendChild(spanForButtonText);
    
    shoppingProductButton.classList.add("shopping-button", "btn-sm");
    shoppingProductButton.onclick = function() { onShoppingProductButtonClick(listOfProducts); };
    return shoppingProductButton;
}

function onShoppingProductButtonClick(listOfProducts) {
    showAddedProductInSideBar(listOfProducts);

    let shoppingCartString = localStorage.getItem(getShoppingCartName());
    let shoppingCartJson = JSON.parse(shoppingCartString);

	let date = new Date();
	let timeStamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();	
	listOfProducts["IdNr"] = timeStamp;

    shoppingCartJson.push(listOfProducts);
    localStorage.setItem(getShoppingCartName(), JSON.stringify(shoppingCartJson));
    updateNumberOfChosenProducts();
}

function showAddedProductInSideBar(showProduct) {
    document.getElementById("sideBar").style.width = "25em";
    document.getElementById("prodTitle").innerText = showProduct.title;
    document.getElementById("prodImg").innerHTML = "<img src=" + showProduct.image + ">";
    
    setTimeout(function() { document.getElementById("sideBar").style.width = 0; }, 3000);
}