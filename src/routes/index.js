const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/login', (req, res, next) => {
	res.render('login');
});

router.post('/login', passport.authenticate('login',{
	successRedirect: '/profile',
	failureRedirect: '/login',
	passReqToCallback: true
}));

router.get('/register', (req, res, next) => {
	res.render('register');
});

router.post('/register', passport.authenticate('register', {
	successRedirect: '/profile',
	failureRedirect: '/register',
	passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
	req.logOut();
	res.redirect('/');
});

router.use((req, res, next) => {
	if(req.isAuthenticated()){
		next();
	} else {
		res.redirect('/');
	}
})

router.get('/profile', (req, res, next) => {
	res.render('profile');
});

module.exports = router;