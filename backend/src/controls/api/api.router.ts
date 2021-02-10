export {};
const {Router} = require('express')

const router = Router()

router.get('/info', (req:any, res: any) => {
	res.status(200).json({
		email: req.user.email,
		username: req.user.username,
		first_name: req.user.first_name,
		last_name: req.user.last_name
	})
})

module.exports = router;
