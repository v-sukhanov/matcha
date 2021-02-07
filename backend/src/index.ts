const express = require('express')
const config = require('config');
const bodyParser = require('body-parser')
const http = require('http');
const connect = require('./utils/db-connection');
const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use( (req: any, res: any, next: () => any) => {

	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use('/auth', require('./controls/auth.ts'));


const server = http.createServer(app)

server.listen(PORT, () => {
	console.log('Server has been started')
})
