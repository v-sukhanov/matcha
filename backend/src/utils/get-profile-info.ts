export {}
const connection = require('./db-connection')
const { greatCircleDistance } = require("great-circle-distance");

async function getInfo(user: any, fromUserId: string) {
	try {
		const tags = (await connection.query('SELECT * FROM tags WHERE user_id=?', [user.id]))[0];
		const photosLink = (await connection.query('SELECT * FROM photos WHERE user_id=?', [user.id]))[0];
		const fameRating = (await connection.query('SELECT COUNT(*) as likeCount FROM likes WHERE to_user_id=?', [user.id]))[0][0].likeCount;
		const haveYourLike = !!(await  connection.query('SELECT * FROM likes WHERE from_user_id=? and to_user_id=?', [fromUserId, user.id]))[0][0]
		const locationUserFRom = (await connection.query('SELECT * FROM locations WHERE user_id=?', [fromUserId]))[0][0];
		const locationUser = (await connection.query('SELECT * FROM locations WHERE user_id=?', [user.id]))[0][0];
		let distanceFromYou;
		if (locationUserFRom && locationUser) {
			distanceFromYou = greatCircleDistance({
				lat1: locationUserFRom.latitude,
				lng1: locationUserFRom.longitude,
				lat2: locationUser.latitude,
				lng2: locationUser.longitude
			})
		}

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.first_name,
			lastName: user.last_name,
			age: user.age,
			gender: user.gender,
			sexualPreference: user.sexual_preference,
			biography: user.biography,
			avatarLink: user.avatarLink,
			tags,
			photosLink,
			fameRating,
			haveYourLike,
			location: locationUser,
			distanceFromYou
		};
	} catch(error) {
		console.log(error);
	}
}

module.exports = getInfo;
