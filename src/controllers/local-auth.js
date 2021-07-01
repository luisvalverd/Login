const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./../database');

passport.use('register', new LocalStrategy ({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, async (req, username, password, done) => {
	const user = await db.getUserByUsername(req.body.username);

	if(req.body.password !== req.body.confirmPassword){
		return done(null, false);
	}
	if(!user){
		console.log('ok');
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
	const user = await db.getUserById(id);
	done(null, user);
});

