const express = require('express')
const router = express.Router()

// @route   GET api/posts/
// @desc    Test
// @access  Public
router.route('/').get((req, res) => {
	res.send('posts api')
})

module.exports = router
