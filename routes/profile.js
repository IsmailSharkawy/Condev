const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const protect = require('../middleware/protect')
const request = require('request')
const { findOneAndUpdate } = require('../models/Profile')
const Profile = require('../models/Profile')
const User = require('../models/User')

// @route   GET api/profile/me
// @desc    get logged in user profile
// @access  Private
router.route('/me').get(protect, async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id }).populate(
		'user',
		['name', 'avatar']
	)

	try {
		if (!profile) {
			res.status(400).json({ msg: 'No such profile exists' })
		} else {
			res.json(profile)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Server Error' })
	}
})

// @route   POST api/profile
// @desc    create user profile
// @access  Private
router
	.route('/')
	.post(
		[
			protect,
			[
				check('status', 'Status field is required').not().isEmpty(),
				check('skills', 'Skills field required').not().isEmpty(),
			],
		],
		async (req, res) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() })
			}

			try {
				const {
					company,
					website,
					location,
					bio,
					status,
					githubusername,
					skills,
					youtube,
					facebook,
					twitter,
					instagram,
					linkedin,
				} = req.body

				//build profile object
				const profileFields = {}
				profileFields.user = req.user.id
				if (company) profileFields.company = company
				if (website) profileFields.website = website
				if (location) profileFields.location = location

				if (bio) profileFields.bio = bio
				if (githubusername) profileFields.githubusername = githubusername
				if (status) profileFields.status = status

				if (skills) {
					profileFields.skills = skills
						.toString()
						.split(',')
						.map((skill) => skill.trim())
				}

				if (youtube) profileFields.youtube = youtube
				if (facebook) profileFields.facebook = facebook
				if (twitter) profileFields.twitter = twitter
				if (instagram) profileFields.instagram = instagram
				if (linkedin) profileFields.linkedin = linkedin

				//build social object
				profileFields.social = {}
				if (youtube) profileFields.social.youtube = youtube
				if (facebook) profileFields.social.facebook = facebook
				if (twitter) profileFields.social.twitter = twitter
				if (instagram) profileFields.social.instagram = instagram
				if (linkedin) profileFields.social.linkedin = linkedin

				let profile = await Profile.findOne({ user: req.user.id })
				if (profile) {
					profile = await Profile.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: profileFields },
						{ new: true }
					)

					return res.json(profile)
				}
				profile = new Profile(profileFields)
				await profile.save()
				return res.json(profile)
			} catch (error) {
				console.log(error)
				return res.status(500).send('Server Error')
			}
		}
	)

// @route   GET api/profile
// @desc    get all profiles
// @access  Public
router.route('/').get(async (req, res) => {
	const profiles = await Profile.find().populate('user', ['name', 'avatar'])

	try {
		if (!profiles) {
			res.status(400).json({ msg: 'No profiles exists' })
		} else {
			res.json(profiles)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Server Error' })
	}
})

// @route   GET api/profile/user/:id
// @desc    get  profile by user id
// @access  Private
router.route('/user/:id').get(protect, async (req, res) => {
	const profile = await Profile.findOne({
		user: req.params.id,
	}).populate('user', ['name', 'avatar'])
	console.log(profile.bio)
	try {
		if (!profile) {
			res.status(400).json({ msg: 'No profiles exist' })
		} else {
			res.json(profile)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Server Error' })
	}
})

// @route   DELETE api/profile/user/:id
// @desc    delete profile,user,posts
// @access  Private
router.route('/').delete(protect, async (req, res) => {
	await Profile.findOneAndRemove({ user: req.user.id })
	await User.findOneAndRemove({ _id: req.user.id })

	res.json('User deleted')

	console.log(error)
	res.status(500).json({ msg: 'Server Error' })
})

// @route   PUT api/profile/experience/
// @desc    Add user experience
// @access  Private
router
	.route('/experience')
	.put(
		protect,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company name is required').not().isEmpty(),
			check('from', 'Start date is required').not().isEmpty(),
		],
		async (req, res) => {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.json(errors.array())
			}
			profile = await Profile.findOne({ user: req.user.id })

			try {
				if (profile) {
					const {
						title,
						company,
						location,
						from,
						to,
						current,
						description,
					} = req.body

					const expBody = {
						title,
						company,
						location,
						from,
						to,
						current,
						description,
					}

					profile.experience.unshift(expBody)
					await profile.save()
					res.json(profile)
				} else res.send('Profile no found')
			} catch (error) {
				console.log(error)
				res.status(500).json({ msg: 'Server Error' })
			}
		}
	)

// @route   DELETE api/profile/experience/:id
// @desc    Remove user experience
// @access  Private
router.route('/experience/:id').delete(
	protect,

	async (req, res) => {
		let profile = await Profile.findOne({
			user: req.user.id,
		})

		try {
			if (profile) {
				const newExp = profile.experience.filter((exp) => {
					return exp._id.toString() !== req.params.id.toString()
				})
				console.log(newExp)
				profile.experience = newExp
				await profile.save()
				res.json(profile)
			} else res.send('Profile not found')
		} catch (error) {
			console.log(error)
			res.status(500).json({ msg: 'Server Error' })
		}
	}
)

// @route   PUT api/profile/education/
// @desc    Add user education
// @access  Private
router
	.route('/education')
	.put(
		protect,
		[
			check('school', 'School name is required').not().isEmpty(),
			check('degree', 'Degree  is required').not().isEmpty(),
			check('from', 'Start date is required').not().isEmpty(),
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
		],
		async (req, res) => {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.json(errors.array())
			}
			profile = await Profile.findOne({ user: req.user.id })

			try {
				if (profile) {
					const {
						school,
						degree,
						fieldofstudy,
						from,
						to,
						current,
						description,
					} = req.body

					const eduBody = {
						school,
						degree,
						fieldofstudy,
						from,
						to,
						current,
						description,
					}

					profile.education.unshift(eduBody)
					await profile.save()
					res.json(profile)
				} else res.send('Profile no found')
			} catch (error) {
				console.log(error)
				res.status(500).json({ msg: 'Server Error' })
			}
		}
	)

// @route   DELETE api/profile/education/:id
// @desc    Remove user education
// @access  Private
router.route('/education/:id').delete(
	protect,

	async (req, res) => {
		let profile = await Profile.findOne({
			user: req.user.id,
		})

		try {
			if (profile) {
				const newEdu = profile.education.filter((edu) => {
					return edu._id.toString() !== req.params.id.toString()
				})
				profile.education = newEdu
				await profile.save()
				res.json(profile)
			} else res.send('Profile not found')
		} catch (error) {
			console.log(error)
			res.status(500).json({ msg: 'Server Error' })
		}
	}
)

// @route   GET api/profile/github/:username
// @desc    get user github repos
// @access  Public

//dont forget to get clientsecret and stuff later
router.route('/github/:username').get(async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=asc`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' },
		}

		request(options, (error, response, body) => {
			if (response.statusCode !== 200) {
				res.status(404).json({ msg: 'user not found' })
			}
			if (error) {
				console.error(error)
			}

			res.json(JSON.parse(body))
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'Server Error' })
	}
})

module.exports = router
