const express = require('express')
const router = express.Router()

const User = require('../models/User')

const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   GET api/users/
// @desc    Test
// @access  Public
router.route('/').post(
	[
		check('name', 'Name field is required').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Password minimum length is 6 character').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req)
		const { name, email, password } = req.body
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		try {
			let user = await User.findOne({ email })
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] })
			}

			const avatar = gravatar.url(email, {
				d: 'mm',
				r: 'pg',
				s: '200',
			}) //creating avatar with user email

			user = await new User({
				name,
				email,
				password,
				avatar,
			})

			//hasing password
			const salt = await bcryptjs.genSalt(10)
			user.password = await bcryptjs.hash(user.password, salt)

			//saving user
			await user.save()

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
