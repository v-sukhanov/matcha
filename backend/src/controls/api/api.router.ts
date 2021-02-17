export {};
const {Router} = require('express')
const connection = require('../../utils/db-connection')
const bcrypt = require('bcrypt')
const multer  = require('multer')
const config = require('config');

const storage = multer.diskStorage({
	destination: function (req:any, file:any, cb:any) {
		cb(null, 'src/assets/uploads/')
	},
	filename: function (req:any, file:any, cb:any) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, uniqueSuffix + '.' + file.mimetype.replace('image/', ''));
	}
})
const upload = multer({ storage })
const router = Router()

router.get('/info', async (req:any, res: any) => {
	try {
		const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [req.user.id]))[0];
		const photosLink = (await connection.query('SELECT * FROM photos WHERE user_id=?', [req.user.id]))[0];
		return res.status(200).json({
			email: req.user.email,
			username: req.user.username,
			firstName: req.user.first_name,
			lastName: req.user.last_name,
			age: req.user.age,
			gender: req.user.gender,
			sexualPreference: req.user.sexual_preference,
			biography: req.user.biography,
			avatarLink: req.user.avatarLink,
			fameRating: req.user.fame_rating,
			tags,
			photosLink
		})
	} catch(error) {
		console.log(error);
		return res.status(500);
	}
})

router.get('/preference/info', async (req:any, res: any) => {
	try {
		const user = (await connection.query('SELECT * FROM users WHERE username=?', [req.query.username]))[0][0]
		const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [user.id]))[0];
		const photosLink = (await connection.query('SELECT * FROM photos WHERE user_id=?', [user.id]))[0];
		await connection.query('INSERT INTO consults(user_id, consulted_user_id) VALUES(?, ?)', [req.user.id, user.id])
		return res.status(200).json({
			email: user.email,
			username: user.username,
			firstName: user.first_name,
			lastName: user.last_name,
			age: user.age,
			gender: user.gender,
			sexualPreference: user.sexual_preference,
			biography: user.biography,
			avatarLink: user.avatarLink,
			fameRating: user.fame_rating,
			tags,
			photosLink
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
				await connection.query('INSERT IGNORE  INTO tags(user_id, text) VALUES(?, ?)', [id, val.text]);
			}
		}
		return res.status(200).json({});
	} catch(error) {
		console.log(error);
		res.status(500).json(['something occurred']);
	}
});

router.post('/avatar', upload.single('file'), async (req: any, res: any) => {
	const id = req.user.id
	try {
		await connection.query('UPDATE users SET avatarLink=? WHERE id=?', [config.get('address') + ':' + config.get('port') + '/uploads/' +  req.file.filename, id]);
		return res.status(200).json({})
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.post('/photo', upload.single('file'), async (req: any, res: any) => {
	const id = req.user.id
	try {
		await connection.query('INSERT INTO photos(link, user_id) VALUES(?, ?)', [config.get('address') + ':' + config.get('port') + '/uploads/' +  req.file.filename, id]);
		return res.status(200).json({})
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.post('/photo/delete', async (req: any, res: any) => {
	try {
		await connection.query('DELETE FROM photos WHERE id=?', [req.body.id]);
		return res.status(200).json({})
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.get('/preferences/get', async (req: any, res: any) => {
	try {

		const preferences = (await connection.query('SELECT * FROM users WHERE id!=?', [req.user.id]))[0];
		const dto = [];
		for (let user of preferences) {
			const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [user.id]))[0];
			const photosLink = (await connection.query('SELECT * FROM photos WHERE user_id=?', [user.id]))[0];
			dto.push({
				email: user.email,
				username: user.username,
				firstName: user.first_name,
				lastName: user.last_name,
				age: user.age,
				gender: user.gender,
				sexualPreference: user.sexual_preference,
				biography: user.biography,
				avatarLink: user.avatarLink,
				fameRating: user.fame_rating,
				tags,
				photosLink
			})
		}
		return res.status(200).json(dto)
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.get('/visits', async (req: any, res: any) => {
	try {
		const consules = (await connection.query('SELECT * FROM consults WHERE user_id=?', [req.user.id]))[0].map((val: any) => val.consulted_user_id)
		const visits = [];
		for (let counsel of consules) {
			const visitProfile = (await connection.query('SELECT * FROM users WHERE id=?', [counsel]))[0][0];
			visits.push(visitProfile);
		}
		const dto = [];
		for (let user of visits) {
			const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [user.id]))[0];
			const photosLink = (await connection.query('SELECT * FROM photos WHERE user_id=?', [user.id]))[0];
			dto.push({
				email: user.email,
				username: user.username,
				firstName: user.first_name,
				lastName: user.last_name,
				age: user.age,
				gender: user.gender,
				sexualPreference: user.sexual_preference,
				biography: user.biography,
				avatarLink: user.avatarLink,
				fameRating: user.fame_rating,
				tags,
				photosLink
			})
		}
		return res.status(200).json(dto)
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

module.exports = router;
