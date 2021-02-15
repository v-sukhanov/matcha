export {};
const {Router} = require('express')
const connection = require('../../utils/db-connection')
const bcrypt = require('bcrypt')

const router = Router()

router.get('/info', async (req:any, res: any) => {
	try {
		const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [req.user.id]))[0];
		return res.status(200).json({
			email: req.user.email,
			username: req.user.username,
			firstName: req.user.first_name,
			lastName: req.user.last_name,
			age: req.user.age,
			gender: req.user.gender,
			sexualPreference: req.user.sexual_preference,
			biography: req.user.biography,
			tags
		})
	} catch(error) {
		console.log(error);
		return res.status(500);
	}

})

router.post('/password/edit', async (req:any, res: any) => {
	const { user } = req;
	const { oldPassword, newPassword, repeatNewPassword } = req.body;
	if (!oldPassword || !newPassword || !repeatNewPassword) {
		return res.status(400).json({})
	}
	if (newPassword !== repeatNewPassword) {
		return res.status(400).json({})
	}
	if (!(await bcrypt.compare(oldPassword, user.password))) {
		return res.status(400).json(['invalid current password'])
	}
	try {
		await connection.query('UPDATE users SET password=? WHERE id=?', [await bcrypt.hash(newPassword, 12), user.id]);
		res.status(200).json({})
	} catch(error) {
		console.log(error);
		return res.status(500).json({});
	}
})

router.post('/account/edit', async (req:any, res: any) => {
	const { email, username, firstName, lastName } = req.body;
	const id = req.user.id
	if (!email || !username || !firstName || !lastName) {
		return res.status(400).json(['please field all fields']);
	}
	try {
		await connection.query('UPDATE users SET email=?, username=?, first_name=?, last_name=? WHERE id=?', [email, username, firstName, lastName, id]);
		return res.status(200).json({});
	} catch(error) {
		console.log(error);
		res.status(500).json(['something occurred']);
	}
});

router.post('/params/edit', async (req:any, res: any) => {
	const { age, gender, sexualPreference, biography, tags } = req.body;
	const id = req.user.id
	try {
		await connection.query('UPDATE users SET age=?, gender=?, sexual_preference=?, biography=? WHERE id=?', [age, gender, sexualPreference, biography, id]);
		await connection.query('DELETE FROM tags WHERE user_id=?', [id]);
		if (tags && tags.length > 0) {
			for (const val of tags) {
				await connection.query('INSERT INTO tags(user_id, text) VALUES(?, ?)', [id, val.text]);
			}
		}
		return res.status(200).json({});
	} catch(error) {
		console.log(error);
		res.status(500).json(['something occurred']);
	}
});

module.exports = router;
