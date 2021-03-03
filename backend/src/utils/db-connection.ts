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
		'password VARCHAR(256),' +
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
		'sexual_preference INT NULL DEFAULT 30,' +
		'avatarLink VARCHAR(256) NULL,' +
		'biography VARCHAR(512) NULL,' +
		'fame_rating INT NULL DEFAULT 0,' +
		'UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE);');
	/**
	 * Mayby error in sexual preference
	 */
	await connection.execute('CREATE TABLE IF NOT EXISTS tags (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  text VARCHAR(45) NOT NULL,' +
		'  user_id INT NOT NULL,' +
		'  PRIMARY KEY (id),' +
		' FOREIGN KEY (user_id)' +
		' REFERENCES users (id)' +
		' ON DELETE CASCADE' +
		' ON UPDATE CASCADE);')
	await connection.execute('CREATE TABLE IF NOT EXISTS photos (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  link VARCHAR(256) NOT NULL,' +
		'  user_id INT NOT NULL,' +
		'  PRIMARY KEY (id),' +
		' FOREIGN KEY (user_id)' +
		' REFERENCES users (id)' +
		' ON DELETE CASCADE' +
		' ON UPDATE CASCADE);')
	await connection.execute('CREATE TABLE IF NOT EXISTS consults (' +
		'  from_user_id INT NOT NULL,' +
		'  to_user_id INT NOT NULL,' +
		'  date DATETIME DEFAULT CURRENT_TIMESTAMP);')
	await connection.execute('CREATE TABLE IF NOT EXISTS likes (' +
		'  from_user_id INT NOT NULL,' +
		'  to_user_id INT NOT NULL,' +
		'  date DATETIME DEFAULT CURRENT_TIMESTAMP);')
	await connection.execute('CREATE TABLE IF NOT EXISTS fakes (' +
		'  from_user_id INT NOT NULL,' +
		'  to_user_id INT NOT NULL);')
	await connection.execute('CREATE TABLE IF NOT EXISTS blocks (' +
		'  from_user_id INT NOT NULL,' +
		'  to_user_id INT NOT NULL);')
	await connection.execute('CREATE TABLE IF NOT EXISTS locations (' +
		'  user_id INT NOT NULL,' +
		'  latitude DECIMAL(4,2) NOT NULL,' +
		'  longitude DECIMAL(4,2) NOT NULL,' +
		'  PRIMARY KEY (user_id)' +
		');')
	await connection.execute('CREATE TABLE IF NOT EXISTS chats (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  date DATETIME DEFAULT CURRENT_TIMESTAMP,' +
		'  PRIMARY KEY (id)' +
		');')
	await connection.execute('CREATE TABLE IF NOT EXISTS chat_members (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  user_id INT NOT NULL,' +
		'  chat_id INT NOT NULL,' +
		'  date DATETIME DEFAULT CURRENT_TIMESTAMP,' +
		'  PRIMARY KEY (id)' +
		');')
	await connection.execute('CREATE TABLE IF NOT EXISTS messages (' +
		'  id INT NOT NULL AUTO_INCREMENT,' +
		'  text VARCHAR(45) NULL,' +
		'  user_id INT NOT NULL,' +
		'  chat_id INT NULL,' +
		'  PRIMARY KEY (id),' +
		'  date DATETIME DEFAULT CURRENT_TIMESTAMP);')
	await connection.execute('CREATE TABLE IF NOT EXISTS users_online (' +
		'  user_id INT NOT NULL,' +
		'  online TINYINT NULL DEFAULT 0,' +
		'  last_seen_date DATETIME,' +
		'  PRIMARY KEY (user_id)' +
		');')
	await connection.execute('CREATE TABLE IF NOT EXISTS notification (' +
		'  user_id INT NOT NULL,' +
		'  last_seen_notification_date DATETIME,' +
		'  last_seen_messages_date DATETIME,' +
		'  PRIMARY KEY (user_id)' +
		');')
}
