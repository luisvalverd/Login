const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./../database');
const encrypt = require('./encrypt');

passport.use('register', new LocalStrategy ({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const user = await db.getUserByUsername(req.body.username);
	
	const data = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword
	}

	const findUser = await db.findUser(data.username, data.email);
	
	if(data.password !== data.confirmPassword){
		return done(null, false);
	}
	
	if (findUser.length > 0) {
		return done(null, false);
	}

	const newUser = await encrypt.savePassword(data.username, data.email, data.password);
	//const findNewUser = await db.getUserByUsername(data.username);
	return done(null, newUser);
	
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
	const user = await db.getUserById(id);
	done(null, user);
});

