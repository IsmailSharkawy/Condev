const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const User = require('../models/User')
const Post = require('../models/Post')

const { check, validationResult } = require('express-validator')
// @route   GET api/posts/
// @desc    Test
// @access  Public
router
	.route('/')
	.post(
		protect,
		[check('text', 'Text field is required').not().isEmpty()],
		async (req, res) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() })
			}

			try {
				const user = await User.findById(req.user.id).select('-password')

				if (user) {
					const postBody = new Post({
						text: req.body.text,
						name: user.name,
						avatar: user.avatar,
						user: req.user.id,
					})

					const post = await postBody.save()
					res.json(post)
				} else {
					res.status(404).json({ msg: 'User not found' })
				}
			} catch (error) {
				console.log(error)
				res.status(500).send('Server Error')
			}
		}
	)

router.route('/').get(
	protect,

	async (req, res) => {
		try {
			const posts = await Post.find({}).sort({
				date: -1,
			})

			if (posts) {
				res.json(posts)
			} else {
				res.status(404).json({ msg: 'User not found' })
			}
		} catch (error) {
			console.log(error)
			res.status(500).send('Server Error')
		}
	}
)

router.route('/:id').get(
	protect,

	async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)

			if (post) {
				res.json(post)
			} else {
				res.status(404).json({ msg: 'Post not found' })
			}
		} catch (error) {
			console.log(error)
			if (error.kind === 'ObjectId') {
				res.status(404).json({ msg: 'Post not found' })
			}
			res.status(500).send('Server Error')
		}
	}
)

router.route('/:id').delete(
	protect,

	async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)

			if (post) {
				if (req.user.id.toString() !== post.user.toString()) {
					res.send('Not authorized')
				} else {
					await post.remove()
					res.json({ msg: 'Post removed.' })
				}
			} else {
				res.status(404).json({ msg: 'Post not found' })
			}
		} catch (error) {
			console.log(error)
			if (error.kind === 'ObjectId') {
				res.status(404).json({ msg: 'Post not found' })
			}
			res.status(500).send('Server Error')
		}
	}
)

router.route('/:id/like').put(
	protect,

	async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)
			console.log(req.user.id.toString())
			console.log(post.likes)

			if (post) {
				const liked = post.likes.filter((like) => {
					return like.user.toString() === req.user.id.toString()
				})
				if (liked.length > 0) {
					res.status(400).send('Already liked')
				} else {
					post.likes.unshift({ user: req.user.id })
					const updatedPost = await post.save()
					res.json(updatedPost.likes)
				}
			} else {
				res.status(404).json({ msg: 'Post not found' })
			}
		} catch (error) {
			console.log(error)
			if (error.kind === 'ObjectId') {
				res.status(404).json({ msg: 'Post not found' })
			}
			res.status(500).send('Server Error')
		}
	}
)

router.route('/:id/unlike').put(
	protect,

	async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)
			console.log(req.user.id.toString())
			console.log(post.likes)

			if (post) {
				const liked = post.likes.filter((like) => {
					return like.user.toString() === req.user.id.toString()
				})

				const unliked = post.likes.filter((like) => {
					return like.user.toString() !== req.user.id.toString()
				})

				if (liked.length === 0) {
					res.status(400).send('Post not liked by user')
				} else {
					post.likes = unliked
					const updatedPost = await post.save()
					res.json(updatedPost.likes)
				}
			} else {
				res.status(404).json({ msg: 'Post not found' })
			}
		} catch (error) {
			console.log(error)
			if (error.kind === 'ObjectId') {
				res.status(404).json({ msg: 'Post not found' })
			}
			res.status(500).send('Server Error')
		}
	}
)

router
	.route('/comment/:id')
	.post(
		protect,
		[check('text', 'Text field is required').not().isEmpty()],
		async (req, res) => {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() })
			}

			try {
				const user = await User.findById(req.user.id).select('-password')

				if (user) {
					const post = await Post.findById(req.params.id)

					const commentBody = {
						text: req.body.text,
						name: user.name,
						avatar: user.avatar,
						user: req.user.id,
					}

					post.comments.unshift(commentBody)
					const updatedPost = await post.save()
					res.json(updatedPost)
				} else {
					res.status(404).json({ msg: 'User not found' })
				}
			} catch (error) {
				console.log(error)
				res.status(500).send('Server Error')
			}
		}
	)

router.route('/comment/:id/:commentId').put(
	protect,

	async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)
			console.log(req.params.commentId)
			console.log(req.params.id)
			console.log(post.comments)
			if (post) {
				const comment = post.comments.find((comment) => {
					return comment._id.toString() === req.params.commentId.toString()
				})
				if (comment) {
					const commentRemoved = post.comments.filter((comment) => {
						return req.params.commentId.toString() !== comment._id.toString()
					})

					if (comment.user.toString() !== req.user.id) {
						res.status(400).send('Not authorized')
					}
					post.comments = commentRemoved
					const updatedPost = await post.save()
					res.json(updatedPost.comments)
				} else {
					res.status(404).send('Comment not found')
				}
			} else {
				res.status(404).json({ msg: 'Post not found' })
			}
		} catch (error) {
			console.log(error)
			if (error.kind === 'ObjectId') {
				res.status(404).json({ msg: 'Post not found' })
			}
			res.status(500).send('Server Error')
		}
	}
)
module.exports = router
