# Payment service integration with Stripe

This is a school project in "webbutveckling inom e-handel" at Medieinstitutet. Subject is integration of 3rd party systems.

The goal of the project is to build a basic webshop which integrates with Stripe, a 3rd party payment service. Requirements:

* Products must be listed on one page
* It should be possible to add products to a shopping cart
* Based on the shopping cart, it should be possible to place an order
* Webshop must use [Stripe](https://stripe.com/docs/testing) as payment service.
* Under no circumstances may the order be placed without completed payment! (ie never save an order item unless you have received confirmation back from the strip that the payment has been processed)
* When the payment is accepted the order must be placed in a JSON file on the server.

[Find this project on GitHub here](https://github.com/vogelsara/payment-service-integration-with-stripe).

## Technical details

The backend of the project is built with NodeJS. For the frontend part I reused elements of [an earlier project of ours](https://github.com/vogelsara/TechStore) in which we built the frontend of a simple webshop with product page, products and shopping cart.

To build a checkout page with card payment I used [this tutorial](https://stripe.com/docs/checkout/integration-builder).

### Install and run

#### Prerequisites

* To clone the project you need Git. If you don't have git, you can download the foler as a zip file.
* To install and run the webserver you need NodeJS and NPM. You can get it [here](https://www.npmjs.com/get-npm).
* Of course you need a web browser.

#### Installation instructions

1. To get this project you have to clone it by `git clone https://github.com/vogelsara/payment-service-integration-with-stripe.git` (alternatively you can download the folder as a zip and unzip it)
2. Move to the folder: `cd payment-service-integration-with-stripe`
3. Get the dependencies by runnin the `npm install` command inside the folder.
4. Start the server by `node server.js` so the server starts to listen on port 3000
5. Visit `http://localhost:3000` to see the webshop

### Behaviour

#### Usage

The index page lists a number of products where the user can add them to the shopping cart by a button. The products listed here are defined in `products.json` on server root. Every product must contain a `title`, a `description` an `image` and a `price`. If you want to add/remove products you have to edit this file. The product images are stored in `public/images` and the `image` in `products.json` should have a link to it. Every time the user clicks on "Add to cart" a product is added to the shopping card as an individual item (if you already selected the same product, it will be a new entry in the shopping cart with a unique id, but same data).

The contents of the shopping cart is stored in a variable on the server. (If you restart the server the data is lost.) This variable is read and written indirectly through a REST API by the client.

On the top right corner of every subpage the current number of shopping cart items are presented. If the user clicks on the shopping cart icon they get redirected to the `/shoppingCart` page where they can see the current contents of the shopping cart along with an up-to-date full price. The user can delete elements here before going to checkout.

The checkout button redirects to the checkout page hosted by Stripe. This is a test environment where you cannot place real payments, but can play like you use a fake credit card.

Use credit card number `4242 4242 4242 4242` with any future expiration date. All the other fields, like e-mail addres or CVC accept any values. On the chekcout page you can see the list of ordered items and a total price, but the order cannot be modified at this point. (Only by cancelling the checkout, editing the shopping cart and starting a new payment process.)

If the user cancels the payment, they get redirected to `/cancel`, and when the payment was succesful they get redirected to `/success` where a thank you message is displayed. This page automatically saves the order to `orders.json`. If the file doesn't exist is gets created. If it exists, a new entry is appended. If the shopping cart is empty, no entry is created. After the order was saved the contents of the shopping cart are wiped. Then the user can go back to the start page using a button under the thank you message.

#### Api endpoints

| What | Value |
| --- | --- |
| **Method** | GET |
| **URL** | `/products` |
| **Description** | Get the products the webshop offers |
| **Example input** | <pre lang="json">{}</pre> |
| **Example output** | <pre lang="json">[<br>    {<br>        "title": "iPhone X",<br>        "description": "Last years phone from Apple with a beautiful all display front.",<br>        "image": "images/iPhoneX.png",<br>        "price": 11495<br>    },{<br>        "title": "One Plus 5",<br>        "description": "Sleek and powerful smartphone from One Plus.",<br>        "image": "images/OnePlus5.png",<br>        "price": 4995<br>    }<br>]</pre> |


| What | Value |
| --- | --- |
| **Method** | GET |
| **URL** | `/cart` |
| **Description** | Get the current contents of the shopping cart |
| **Example input** | <pre lang="json">{}</pre> |
| **Example output** | <pre lang="json">[<br>      {<br>        "id": 1,<br>        "title": "iPhone X",<br>        "description": "Last years phone from Apple with a beautiful all display front.",<br>        "image": "images/iPhoneX.png",<br>        "price": 11495<br>      },<br>      {<br>        "id": 2,<br>        "title": "One Plus 5",<br>        "description": "Sleek and powerful smartphone from One Plus.",<br>        "image": "images/OnePlus5.png",<br>        "price": 4995<br>      },<br>      {<br>        "id": 3,<br>        "title": "Galaxy S8",<br>        "description": "Really cool edge to edge smartphone from Samsung.",<br>        "image": "images/SamsungS8.png",<br>        "price": 7990<br>      }<br>    ]</pre> |

| What | Value |
| --- | --- |
| **Method** | POST |
| **URL** | `/cart` |
| **Description** | Adds a new element to the shopping cart. Id gets auto incremented. Responts with status `200` and the id of the newly added item. |
| **Example input** | <pre lang="json">{<br>	"id": 1,<br>	"title": "iPhone X",<br>	"description": "Last years phone from Apple with a beautiful all display front.",<br>	"image": "images/iPhoneX.png",<br>	"price": 11495<br>}</pre> |
| **Example output** | <pre lang="json">3</pre> |

| What | Value |
| --- | --- |
| **Method** | DELETE |
| **URL** | `/cart/:id` (e.g. `/cart/42`) |
| **Description** | Removes the element with the given id from the shopping cart. Responds with status `200`. |
| **Example input** | <pre lang="json">{}</pre> |
| **Example output** | <pre lang="json">{}</pre> |


| What | Value |
| --- | --- |
| **Method** | POST |
| **URL** | `/order` |
| **Description** | Places the order. Appends the contents of the shopping cart to `orders.json` with a timestamp if the shopping cart is not empty. Responds with status `200` and the contents of the order. If shopping cart is empty, responds with `404` and and `{message: "The shopping cart is empty"}` |
| **Example input** | <pre lang="json">{}</pre> |
| **Example output** | <pre lang="json"> {<br>    "timeStamp": "2020-9-13 0:37:10:376",<br>    "orderedItems": [<br>      {<br>        "id": 1,<br>        "title": "iPhone X",<br>        "description": "Last years phone from Apple with a beautiful all display front.",<br>        "image": "images/iPhoneX.png",<br>        "price": 11495<br>      },<br>      {<br>        "id": 2,<br>        "title": "One Plus 5",<br>        "description": "Sleek and powerful smartphone from One Plus.",<br>        "image": "images/OnePlus5.png",<br>        "price": 4995<br>      },<br>      {<br>        "id": 3,<br>        "title": "Galaxy S8",<br>        "description": "Really cool edge to edge smartphone from Samsung.",<br>        "image": "images/SamsungS8.png",<br>        "price": 7990<br>      }<br>    ]<br>  }</pre> |


| What | Value |
| --- | --- |
| **Method** | POST |
| **URL** | `/create-session` |
| **Description** | Creates a payment session on Stripe and returns the session id. More details on the [tutorial of Stripe](https://stripe.com/docs/checkout/integration-builder). |
| **Example input** | <pre lang="json">{}</pre> |
| **Example output** | <pre lang="json"> { id: 42 }</pre> |

#### Orders

The placed orders appear in `orders.json` on the server. This file is ignored by git, because it's generated by the software when the first order is made (it also means it's safe to delete it). If the file exists, every new order is appended to the file. An order contains a timestamp when the order was created and a list of ordered items.

An order is saved only if a payment was successful. This is solved by saving the order from the `success.html` page.