var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: 'localhost',
	tls: {
		rejectUnauthorized: false
	}
});



export function sendMail(to: string, subject: string, html: string) {
	transporter.sendMail({
		from: 'no-reply@matcha.com',
		to,
		subject,
		html
	}, (error: any, info: any) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
