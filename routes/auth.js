const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { findById } = require('../models/User')

// @route   GET api/auth/
// @desc    Test
// @access  Public
router.route('/').get(protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		if (user) res.status(200).json(user)
		else res.json({ msg: 'user not found??!' })
	} catch (error) {
		console.log(error.message)
		res.status(500).send('Server error')
	}
})

router
	.route('/')
	.post(
		[
			check('email', 'Please enter a valid email').isEmail(),
			check('password', 'Password field required').exists(),
		],
		async (req, res) => {
			const errors = validationResult(req)
			const { email, password } = req.body
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}
			try {
				let user = await User.findOne({ email })
				if (!user) {
					return res
						.status(400)
						.json({ errors: [{ msg: 'Invalid credentials' }] })
				}

				//verifying password
				const isMatch = bcryptjs.compare(password, user.password)

				if (!isMatch) {
					res.status(400).json({ msg: 'Invalid credentials' })
				}

				const payload = {
					user: {
						id: user.id,
					},
				}

				jwt.sign(
					payload,
					config.get('jwtToken'),
					{
						expiresIn: 360000,
					},
					(error, token) => {
						if (error) throw error
						else res.json({ token })
					}
				)
			} catch (error) {
				console.log(error.message)
				res.status(500).send('Server error')
			}
		}
	)
module.exports = router
