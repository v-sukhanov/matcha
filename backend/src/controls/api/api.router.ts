import { GenderEnum } from '../../enums/gender.enum';
import { SexualPreferenceEnum } from '../../enums/sexual-preference.enum';
import { NotificationTypeEnum } from '../../enums/notification-type.enum';

export {};
const {Router} = require('express')
const connection = require('../../utils/db-connection')
const getInfo = require('../../utils/get-profile-info')
const { sendEvent } = require('../socket/socket')
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
		return res.status(200).json(await getInfo(req.user, req.user.id));
	} catch(error) {
		console.log(error);
		return res.status(500);
	}
})

router.get('/preference/info', async (req:any, res: any) => {
	try {
		const user = (await connection.query('SELECT * FROM users WHERE username=?', [req.query.username]))[0][0]

		await connection.query('INSERT INTO consults(from_user_id, to_user_id) VALUES(?, ?)', [req.user.id, user.id])

		return res.status(200).json(await getInfo(user, req.user.id));

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
				await connection.query('INSERT  INTO tags(user_id, text) VALUES(?, ?)', [id, val.text]);
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

router.post('/avatar/delete', upload.single('file'), async (req: any, res: any) => {
	const id = req.user.id
	try {
		await connection.query('UPDATE users SET avatarLink=? WHERE id=?', [null, id]);
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
	const user = req.user;
	try {

		const preferences = (await connection.query('SELECT * FROM users WHERE id!=?', [req.user.id]))[0];
		let dto = [];
		for (let preference of preferences) {
			if (user.sexual_preference !== SexualPreferenceEnum.BiSexual) {
				if (user.sexual_preference === SexualPreferenceEnum.Female && preference.gender !== GenderEnum.Female) {
					continue ;
				}
				if (user.sexual_preference === SexualPreferenceEnum.Male && preference.gender !== GenderEnum.Male) {
					continue ;
				}
			}
			if (!!(await connection.query('SELECT * FROM blocks WHERE from_user_id=? and to_user_id=?', [user.id, preference.id]))[0][0]) {
				continue ;
			}
			dto.push(await getInfo(preference, user.id));
		}
		dto = dto.sort((a, b) => a.distanceFromYou > b.distanceFromYou ? 1 : -1 );
		return res.status(200).json(dto)
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.get('/visits', async (req: any, res: any) => {
	try {
		const consules = (await connection.query('SELECT * FROM consults WHERE from_user_id=?', [req.user.id]))[0].map((val: any) => val.to_user_id)
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

router.post('/like', async (req: any, res: any) => {
	try {
		const like = (await connection.query('SELECT * FROM likes WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id]))[0][0]
		const like_from_user = (await connection.query('SELECT * FROM likes WHERE from_user_id=? and to_user_id=?', [req.body.id, req.user.id]))[0][0]
		if (like) {
			await connection.query('DELETE FROM likes WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id])
			return res.status(200).json({like: false})
		} else {
			await connection.query('INSERT INTO likes(from_user_id, to_user_id) VALUES(?, ?)', [req.user.id, req.body.id])
			if (like_from_user && !(await  connection.query('select * from chat_members as s1 inner join chat_members as s2 on s1.chat_id=s2.chat_id where s1.user_id=? and s2.user_id=?;', [req.user.id, req.body.id]))[0][0]) {
				const { insertId } = (await connection.query('INSERT INTO chats() VALUES()'))[0];
				await connection.query("INSERT INTO chat_members(user_id, chat_id) VALUES(?, ?)", [req.user.id, insertId]);
				await connection.query("INSERT INTO chat_members(user_id, chat_id) VALUES(?, ?)", [req.body.id, insertId]);
			}
			sendEvent(req.body.id);
			return res.status(200).json({like: true})
		}
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})


router.post('/fake', async (req: any, res: any) => {
	try {
		const like = (await connection.query('SELECT * FROM fakes WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id]))[0][0]
		if (like) {
			await connection.query('DELETE FROM fakes WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id])
			return res.status(200).json({like: false})
		} else {
			await connection.query('INSERT INTO fakes(from_user_id, to_user_id) VALUES(?, ?)', [req.user.id, req.body.id])
			return res.status(200).json({like: true})
		}
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.post('/block', async (req: any, res: any) => {
	try {
		const like = (await connection.query('SELECT * FROM blocks WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id]))[0][0]
		if (like) {
			await connection.query('DELETE FROM blocks WHERE from_user_id=? and to_user_id=?', [req.user.id, req.body.id])
			return res.status(200).json({like: false})
		} else {
			await connection.query('INSERT INTO blocks(from_user_id, to_user_id) VALUES(?, ?)', [req.user.id, req.body.id])
			return res.status(200).json({like: true})
		}
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})


router.post('/location', async (req: any, res: any) => {
	const { longitude, latitude } = req.body;
	try {
		await connection.query('INSERT INTO locations(user_id, longitude, latitude) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE longitude=?, latitude=?', [req.user.id, longitude, latitude, longitude, latitude]);
		return res.status(200).json({})
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

async function getNotification(id: string) {
	const blocks = (await connection.query('SELECT * FROM blocks WHERE from_user_id=?', [id]))[0].map((val: any) => val.to_user_id);
	blocks.push(0);
	const likes = (await connection.query('SELECT * FROM likes WHERE to_user_id=? and NOT(from_user_id IN(?)) ORDER BY date DESC', [id, blocks]))[0].map((val: any) => {
		return {
			...val,
			type: NotificationTypeEnum.Like
		}
	});
	const consults = (await connection.query('SELECT * FROM consults WHERE to_user_id=? and NOT(from_user_id IN(?)) ORDER BY date DESC', [id, blocks]))[0].map((val: any) => {
		return {
			...val,
			type: NotificationTypeEnum.Consulted
		}
	});
	return [
		...likes,
		...consults
	].filter((a: any, b: any) => new Date(a.date) > new Date(b.date) ? -1 : 1);
}

router.get('/notifications', async (req: any, res: any) => {
	const { id } = req.user;
	try {
		const notifications = await getNotification(id)
		const notificationWithInfo = [];
		for (let not of notifications) {
			const user = await getInfo((await connection.query('SELECT * FROM users WHERE id=?', [not.from_user_id]))[0][0], not.to_user_id);
			notificationWithInfo.push({
				...not,
				fromUser: user
			})
		}
		if (!(await connection.query('SELECT * FROM notification WHERE user_id=?', [id]))[0][0]) {
			await connection.query("INSERT INTO notification(user_id, last_seen_notification_date) VALUES(?, ?)", [id, new Date()]);
		} else {
			await connection.query("UPDATE notification SET last_seen_notification_date=? WHERE user_id=?", [new Date(), id]);
		}
		return res.status(200).json(notificationWithInfo);
	} catch(error) {
		console.log(error);
		return res.status(500).json();
	}
})

router.get('/chats', async (req: any, res: any) => {
	const { id } = req.user;
	try {
		const chats = (await connection.query('SELECT * FROM chat_members WHERE user_id=? ORDER BY date DESC', [id]))[0];
		let chatsWithUserInfo = [];
		for (const chat of chats) {
			const user = (await connection.query('SELECT s1.* FROM users as s1 inner join chat_members as s2 on s1.id=s2.user_id where s2.chat_id=? and s1.id!=?', [chat.chat_id, id]))[0][0];
			const lastMessage = (await connection.query('SELECT * FROM messages WHERE chat_id=? ORDER BY date DESC', [chat.chat_id]))[0][0]
			chatsWithUserInfo.push({
				...chat,
				fromUser: user,
				lastMessage
			})
		}
		chatsWithUserInfo = chatsWithUserInfo.sort((a: any, b: any) => new Date(a?.lastMessage?.date) > new Date(b?.lastMessage?.date) ? -1 : 1)
		if (!(await connection.query('SELECT * FROM notification WHERE user_id=?', [id]))[0][0]) {
			await connection.query("INSERT INTO notification(user_id, last_seen_messages_date) VALUES(?, ?)", [id, new Date()]);
		} else {
			await connection.query("UPDATE notification SET last_seen_messages_date=? WHERE user_id=?", [new Date(), id]);
		}
		return res.status(200).json(chatsWithUserInfo);
	}
	catch(error) {
		console.log(error);
		return res.status(500).json();
	}
});


router.get('/messages/get', async (req:any, res: any) => {
	try {
		const messages = (await connection.query('SELECT * FROM messages WHERE chat_id=?', [req.query.chatId]))[0];
		const messagesWithUserInfo = []
		for (let message of messages) {
			const user = (await connection.query('SELECT * FROM users WHERE id=?', [message.user_id]))[0][0];
			messagesWithUserInfo.push({
				...message,
				fromUser: user
			})
		}
		if (!(await connection.query('SELECT * FROM notification WHERE user_id=?', [req.user.id]))[0][0]) {
			await connection.query("INSERT INTO notification(user_id, last_seen_messages_date) VALUES(?, ?)", [req.user.id, new Date()]);
		} else {
			await connection.query("UPDATE notification SET last_seen_messages_date=? WHERE user_id=?", [new Date(), req.user.id]);
		}
		return res.status(200).json(messagesWithUserInfo);
	} catch(error) {
		console.log(error);
		return res.status(500);
	}
})

router.post('/messages/send', async (req:any, res: any) => {
	const { chatId, userId, text } = req.body;
	try {
		await connection.query('INSERT INTO messages(text, user_id, chat_id) VALUES(?, ?, ?)', [text, userId, chatId]);
		const chat_member = (await connection.query('SELECT * FROM chat_members WHERE chat_id=?', [chatId]))[0].filter((val: any) => val.user_id != req.user.id);
		sendEvent(chat_member[0].user_id);
		return res.status(200).json({});
	} catch(error) {
		console.log(error);
		return res.status(500);
	}
})

router.get('/notification/count', async (req:any, res: any) => {
	const { id } = req.user;
	try {
		let last_seen_notification_date: any;
		let last_seen_messages_date: any;
		const data = (await connection.query('SELECT * FROM notification WHERE user_id=?', [id]))[0][0];
		if (data) {
			last_seen_notification_date = data.last_seen_notification_date;
			last_seen_messages_date = data.last_seen_messages_date;
		}
		const unreadCountNotification =(await getNotification(id)).filter((val: any) => val.date > last_seen_notification_date);
		let unreadCountMessages = 0;
		const chats = (await connection.query('SELECT * FROM chat_members WHERE user_id=? ORDER BY date DESC', [id]))[0];
		for (let chat of chats) {
			const messages = (await connection.query('SELECT * from messages where chat_id=?', [chat.chat_id]))[0];
			unreadCountMessages += messages.filter((val: any) => {
				// console.log(val.date, last_seen_messages_date, chat.id);
				return val.date > last_seen_messages_date;
			}).length;
		}
		return res.status(200).json({ unreadCountNotification: unreadCountNotification.length, unreadCountMessages });
	} catch(error) {
		console.log(error);
		return res.status(500);
	}
})


module.exports = router;
