const { Pool } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'users_login',
	password: 'mhgygjlop2',
	port: 5432,
});

const getUserById = async (id) => {
	const data = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return data.rows;
}

const getUserByUsername = async (username) => {
	const data = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return data.rows;
}

const insertUser = async (username, email, password) => {
	await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
	const dataUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return dataUser.rows[0];
}

const findUser = async (username, email) => {
	const data = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
	return data.rows;
}

module.exports = {
	getUserById,
	insertUser,
	getUserByUsername,
	findUser
}
