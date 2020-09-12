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

### Install and run

#### Prerequisites

* To clone the project you need Git. If you don't have git, you can download the foler as a zip file.
* To install and run the webserver you need NodeJS and NPM. You can get it [here](https://www.npmjs.com/get-npm).

#### Installation instructions

1. To get this project you have to clone it by `git clone https://github.com/vogelsara/payment-service-integration-with-stripe.git` (alternatively you can download the folder as a zip and unzip it)
2. Move to the folder: `cd payment-service-integration-with-stripe`
3. Get the dependencies by runnin the `npm install` command inside the folder.
4. Start the server by `node server.js` so the server starts to listen on port 3000
5. Visit `http://localhost:3000` to see the webshop