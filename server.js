const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('./public'));
const YOUR_DOMAIN = 'http://localhost:4242';

let shoppingCart = [];
let idIndex = 1;

app.get('/products', (req, res) => {
  let products = JSON.parse(fs.readFileSync('./products.json'));
  res.status(200).json(products);
});

app.get('/cart', (req, res) => {
  res.status(200).json(shoppingCart);
})

app.post('/cart', (req, res) => {
  const product = {id: idIndex++, ...req.body};
  shoppingCart.push(product);
  res.status(201).json(product.id);
});

app.delete('/cart/:id', (req, res) => {
  let idToDelete = req.params["id"];
  let index = 0;
  
  for (var i = 0; i < shoppingCart.length; i++) {
    if (idToDelete == shoppingCart[i].id) {
      index = i;
      break;
    }
  }
  
  shoppingCart.splice(index, 1);
  res.status(200).json({});
});

app.post('/order', (req, res) => {
  if (shoppingCart) {
    let orders;
    try {
      orders = JSON.parse(fs.readFileSync('orders.json'));
    } catch (err) {
      orders = [];
    }
    let orderedItems = shoppingCart;
    shoppingCart = [];
    
    let date = new Date();
    let timeStamp = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    
    orders.push({timeStamp: timeStamp, orderedItems: orderedItems});

    stringifiedOrders = JSON.stringify(orders, null, 2);
    fs.writeFileSync('orders.json', stringifiedOrders);
    res.status(200).json(orderedItems);
  } else {
    res.status(404).json({message: "The shopping cart is empty"});
  }
})

app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));