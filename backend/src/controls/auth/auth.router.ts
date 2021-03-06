import { ApiResponse } from '../../models/api-response';
import { ApiError } from '../../models/api-error';
import { sendMail } from '../../utils/email';
import has = Reflect.has;
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const bcrypt = require('bcrypt')
const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const connection = require('../../utils/db-connection')
const router = Router()
const config = require('config');


router.post('/signup',
	[
		check('email', 'invalid email').isEmail(),
		check('password', 'invalid password').isLength({ min: 6 }),
		check('confirmPassword', 'invalid confirm password').custom((value: any, { req }: any) => (value === req.body.password) && value),
		check('username', 'invalid username').isLength({ min: 1}),
		check('lastName', 'invalid lastName').isLength({ min: 1}),
		check('firstName', 'invalid firstName').isLength({ min: 1}),
	],
	async (req: any, res: any) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json([errors.array().map((val: any) => val.msg)])
		}
		const data = req.body;
		try {
			const sameUser = (await connection.query('SELECT * FROM users WHERE username=? or email=?', [data.username, data.email]))[0];
			if (sameUser.length) {
				return res.status(400).json(['user wit this email or name already exist'])
			}
			const hashedPassword = await bcrypt.hash(data.password, 12)
			const hash = randtoken.uid(128);
			await connection.query('INSERT INTO users(email, username, password, first_name, last_name, hash)' +
				'VALUES(?, ?, ?, ?, ?, ?)',[data.email, data.username, hashedPassword, data.firstName, data.lastName, hash]);
			sendMail(data.email, 'email verify', `please click this <a href="http://localhost:4200/confirm?hash=${hash}">link</a> to confirm your email`);
		} catch (err) {
			console.log(err);
			return res.status(500).json({});
		}

		res.status(201).json(new ApiResponse<string>({data: 'user have been created'}));
})

router.post('/confirm', async (req: any, res: any) => {
	const hash = req.body.hash;
	if (!hash) {
		return res.status(400).json(['hash was not received']);
	}
	try {
		await connection.query('UPDATE users set verify="1" WHERE hash=?', [hash])
		return res.status(500).json({});
	} catch(err) {
		console.log(err);
		return res.status(500).json({});
	}
})

router.post('/signin', async (req: any, res: any) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json(['params was not received']);
	}
	try {
		const user = (await connection.query('SELECT * FROM users WHERE username=?', [username]))[0][0];
		if (!user) {
			return res.status(400).json(['user with this name is not created']);
		}
		if (!user.verify) {
			return res.status(400).json(['pleas verify your email']);
		}
 		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(400).json(['invalid password']);
		}
		const refreshToken = randtoken.uid(128);
		const accessToken = jwt.sign(
			{
				id: user.id
			},
			config.get('secret'),
			{ expiresIn: '10000s' }
		)
		await connection.query('UPDATE users SET access_token =?, refresh_token=? WHERE id=?', [accessToken, refreshToken, user.id]);
		return res.status(200).json({refreshToken, accessToken})
	} catch(err) {
		console.log(err);
		return res.status(500).json({});
	}
})

router.post('/google/signin', async (req: any, res: any) => {
	const { email, username, lastName, firstName } = req.body;
	try {
		let user = (await connection.query('SELECT * FROM users WHERE email=?', [email]))[0][0];
		if (!user) {
			await connection.query('INSERT INTO users(email, username, first_name, last_name, verify, hash) VALUES(?, ?, ?, ?, ?, ?)', [email, username, firstName, lastName, 1, randtoken.uid(128)])
		}
		user = (await connection.query('SELECT * FROM users WHERE email=?', [email]))[0][0];

		const refreshToken = randtoken.uid(128);
		const accessToken = jwt.sign(
			{
				id: user.id
			},
			config.get('secret'),
			{ expiresIn: '10000s' }
		)
		await connection.query('UPDATE users SET access_token =?, refresh_token=? WHERE id=?', [accessToken, refreshToken, user.id]);
		return res.status(200).json({refreshToken, accessToken})
	} catch(err) {
		console.log(err);
		return res.status(500).json({});
	}
})

router.post('/forgot', [check('email', 'invalid email').isEmail(),], async (req: any, res: any) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json([errors.array().map((val: any) => val.msg)])
	}
	const email = req.body.email;
	try {
		const user = (await connection.query('SELECT * FROM users WHERE email=?', [email]))[0][0]
		sendMail(email, 'email verify', `Please click this <a href="http://localhost:4200/recovery?hash=${user.hash}">link</a> to recovery your password`);
		return res.status(200).json({});
	} catch(err) {
		console.log(err);
		return res.status(500).json({});
	}
})

router.post('/recovery', [
		check('password', 'invalid password').isLength({ min: 6 }),
		check('confirmPassword', 'invalid confirm password').custom((value: any, { req }: any) => (value === req.body.password) && value),
		check('hash', 'invalid hash').isLength({ min: 1})
	], async (req: any, res: any) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json([errors.array().map((val: any) => val.msg)])
		}
		const { password, confirmPassword, hash } = req.body;
		try {
			const user = (await connection.query('SELECT * FROM users WHERE hash=?', [hash]))[0][0];
			if (!user) {
				return res.status(400).json(['hash invalid']);
			}
			await connection.query('UPDATE users SET password=?', [await bcrypt.hash(password, 12)]);
			return res.status(200).json({})
		} catch (err) {
			console.log(err);
			return res.status(500).json({});
		}
	})

module.exports = router;
