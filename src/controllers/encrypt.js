const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('./../database');

const data = {
	username: "test2",
	email: "test2@gmail.com",
	password: "12345"
}
const savePassword = async (username, email, password) => { 
	const newUser = await new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				const userCreate = await db.insertUser(username, email, hash);
				resolve(userCreate);
			});
		});
	});
	return newUser;
}

const comparePassword = async (username, password) => {
	const userCorrect = await new Promise(async (resolve, reject) => {
		const findUser = await db.getUserByUsername(username);
		bcrypt.compare(password, findUser[0].password, async (err, result) => {
			const user = await db.getUserByUsername(username);
			resolve(user[0]);
		});
	});
	return userCorrect;
}


module.exports = {
	savePassword,
	comparePassword
}





