const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      config = require('./config.js'),
      checkForSession = require('./middlewares/checkForSession.js'),
      sc = require('./controllers/swag_controller.js'),
      auth_controller = require('./controllers/auth_controller.js'),
      cart_controller = require('./controllers/cart_controller.js'),
      search_controller = require('./controllers/search_controller.js'),
      app = express(),
      port = 3000

//==========TOP LEVEL MIDDLEWARE ===================//

app.use(bodyParser.json());
app.use(session({
    secret: config.secret,
    saveUninitialized: false,
    resave: false
}));
app.use(checkForSession);  
app.use(express.static(`${__dirname}/public/build`));    

// ==========ENDPOINTS==================//

app.get('/api/swag', sc.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);








app.listen(port, ()=> console.log(`Listening on port ${port}`));