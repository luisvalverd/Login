const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const { json, urlencoded } = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();

require('./controllers/local-auth');
require('./database');

// settings
app.set('port', process.env.PORT || 3000);
app.use(expressLayout)
app.set('layout','./layouts/layout');
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cookieParser('codigoClave'));
app.use(session({
	secret: 'codigoClave',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', router);
app.use('/login', router);
app.use('/register', router);

// initializacion
app.listen(app.get('port'), () => {
	console.log(`listen on port ${app.get('port')}`);
});

