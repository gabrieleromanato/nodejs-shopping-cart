'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const routes = require('./routes');
const {sessionKeys, sessionName, currencySymbol} = require('./config');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded( { extended: true } ) );

app.use(cookieSession({
    name: sessionName,
    keys: sessionKeys
}));

app.locals.currency = currencySymbol;

app.get('/', routes.home);
app.get('/cart', routes.cart);

app.post('/cart/add', routes.addToCart);
app.post('/cart/get', routes.getCart);
app.post('/cart/empty', routes.emptyCart);
app.post('/cart/remove', routes.removeFromCart);
app.post('/cart/update', routes.updateCart);


app.listen(port);

