const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post('/login', (req, res, next) => {
	res.render('login');
});

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', passport.authenticate('register', {
	successRedirect: '/',
	failureRedirect: '/register',
	passReqToCallback: true
}));


module.exports = router;