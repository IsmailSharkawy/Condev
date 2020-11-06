const express = require('express')
const router = express.Router()

// @route   GET api/auth/
// @desc    Test
// @access  Public
router.route('/').get((req, res) => {
	res.json('auth api')
})

module.exports = router
