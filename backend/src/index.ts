const express = require('express')
const config = require('config');
const bodyParser = require('body-parser')
const http = require('http');
const connect = require('./utils/db-connection');
const app = express()
const PORT = config.get('port') || 5000
const {ExtractJwt, Strategy} = require('passport-jwt')
const passport = require('passport')
const connection = require('./utils/db-connection')
const cors = require('cors');

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get('secret')
}

var strategy = new Strategy(jwtOptions, async (jwtPayload: any, next: any) => {
	try {
		const user = (await connection.query('SELECT * FROM users WHERE id=?', [jwtPayload.id]))[0][0];
		if (user) {
			next(null, user)
		}
		else {
			next(null, false)
		}
	} catch (err) {
		console.log(err);
		next(null, false)
	}
})

passport.use(strategy)

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
	origin: ['http://localhost:4200', 'http://localhost:4220']
}));
app.use('/auth', require('./controls/auth/auth.router.ts'));
app.use('/api/tokens', require('./controls/tokens/tokens.router.ts'));
app.use('/api/user', passport.initialize(), passport.authenticate('jwt', {session: false}), require('./controls/api/api.router.ts'));

//
const server = http.createServer(app)

server.listen(PORT, () => {
	console.log('Server has been started')
})
