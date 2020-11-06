const express = require('express')
const router = express.Router()

// @route   GET api/users/
// @desc    Test
// @access  Public
router.route('/').get((req, res) => {
	res.send('users api')
})

module.exports = router
