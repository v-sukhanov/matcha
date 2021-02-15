import { QueryError } from 'mysql2';

const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'gorislav',
	database: 'matcha',
	password: 'cew100bth'
}).promise();

setup();

module.exports = connection;

async function setup() {

	await connection.execute('CREATE TABLE IF NOT EXISTS users (' +
		'id INT NOT NULL AUTO_INCREMENT,' +
		'email VARCHAR(256) NOT NULL,' +
		'password VARCHAR(256) NOT NULL,' +
		'username VARCHAR(256) NOT NULL,' +
		'first_name VARCHAR(256) NOT NULL,' +
		'last_name VARCHAR(256) NOT NULL,' +
		'UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,' +
		'PRIMARY KEY (id),' +
		'UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,' +
		'hash VARCHAR(256) NOT NULL,' +
		'verify TINYINT NULL DEFAULT 0,' +
		'access_token VARCHAR(256) NULL,' +
		'refresh_token VARCHAR(256) NULL,' +
		'gender INT NULL,' +
		'age INT NULL,' +
		'sexual_preference INT NULL,' +
		'biography VARCHAR(512) NULL,' +
		'UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE);');
	await connection.execute('CREATE TABLE IF NOT EXISTS tags (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  text VARCHAR(45) NOT NULL,' +
		'  user_id INT NOT NULL,' +
		'  PRIMARY KEY (id),' +
		' FOREIGN KEY (user_id)' +
		' REFERENCES users (id)' +
		' ON DELETE CASCADE' +
		' ON UPDATE CASCADE);')
}
