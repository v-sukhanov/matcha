import { ApiResponse } from '../models/api-response';
import { ApiError } from '../models/api-error';
import { sendMail } from '../utils/email';
const randtoken = require('rand-token')
const bcrypt = require('bcrypt')
const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const connection = require('../utils/db-connection')
const router = Router()


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
			sendMail(data.email, 'email verifi', `please click this <a href="http://localhost:4200/confirm?hash=${hash}">link</a> to confirm your email`);
		} catch (err) {
			console.log(err);
			return res.status(500).json({});
		}

		res.status(201).json(new ApiResponse<string>({data: 'user have been created'}));
})

router.get('/')

module.exports = router;
