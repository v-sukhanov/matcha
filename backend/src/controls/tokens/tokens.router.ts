export {};
const {Router} = require('express')
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const connection = require('../../utils/db-connection')
const config = require('config');
const router = Router()

router.post('/update', async (req: any, res: any) => {
	const { refreshToken, accessToken } = req.body
	const { id } = jwt_decode(accessToken);
	try {
		const user = (await connection.query('SELECT * FROM users WHERE id=? and refresh_token=?', [id, refreshToken]))[0][0];
		if (!user) {
			return res.status(400).json({});
		}
		const newRefreshToken = randtoken.uid(128);
		const newAccessToken = jwt.sign(
			{
				id: user.id
			},
			config.get('secret'),
			{ expiresIn: '10000s' }
		)
		await connection.query('UPDATE users SET access_token =?, refresh_token=? WHERE id=?', [newAccessToken, newRefreshToken, id]);
		return res.status(200).json({ refreshToken: newRefreshToken, accessToken: newAccessToken })
	} catch (err) {
		console.log(err);
		return res.status(500).json({});
	}
	return res.status(200).json({});
})

module.exports = router;
