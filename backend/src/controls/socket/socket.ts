export {}
const connection = require('../../utils/db-connection')
const getInfo = require('../../utils/get-profile-info')
let socket: any;
const socket_listener = (io: any) => {
	socket = io
	io.on('connection', async (socket: any) => {
		let userId: string;
		socket.on('userId', async (data: any) => {
			userId = data;
			socket.join(userId);
			try {
				await connection.query('INSERT into users_online(user_id, online) VALUES(?, ?) ON DUPLICATE KEY UPDATE online=1;', [userId, 1])
			}
			catch (e) {
				console.log(e);
			}
		})
		socket.on('disconnect', async (data: any) => {
			if (!userId) {
				return ;
			}
			try {
				await connection.query('INSERT into users_online(user_id, online) VALUES(?, ?) ON DUPLICATE KEY UPDATE online=0, last_seen_date=?;', [userId, 0, new Date(), new Date()])
			}
			catch (e) {
				console.log(e);
			}
		})
	})


}

const sendEvent = (userId: string) => {
	if (socket) {
		socket.to(userId).emit('message');
	}
}
module.exports = {
	socket_listener,
	sendEvent
}

