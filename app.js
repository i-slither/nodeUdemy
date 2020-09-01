const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const hbs = require('express-handlebars');
const errorController = require('./controllers/error');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.engine('hbs', hbs({
//     layout: 'views/layouts', 
//     defaultLayout: 'main-layout' ,
//     extname: 'hbs'}));

app.set('view engine', 'ejs');

//app.set('view engine', 'hbs');
//app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);// page not found or undefined route...

app.listen(3000);