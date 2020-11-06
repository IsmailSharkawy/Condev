const express = require('express')
const router = express.Router()

// @route   GET api/profile/
// @desc    Test
// @access  Public
router.route('/').get((req, res) => {
	res.send('profile api')
})

module.exports = router
