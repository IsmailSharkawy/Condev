const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
	const token = req.header('Bearer-Token')

	if (!token) {
		res.status(401).json({ msg: 'no token found' })
	}
	try {
		const decoded = jwt.verify(token, config.get('jwtToken')) //get decoded user object (extracted from token) in const decoded and assign it to user in the request to be used in further stages if needed
		req.user = decoded.user
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ msg: 'token denied' })
	}
}
