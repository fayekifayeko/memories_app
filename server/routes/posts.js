import express from 'express'
import { auth } from '../middleware/auth.js'

import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    getPost,
    comment,
} from '../controllers/posts.js'

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts) // no need to be authenticated
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.post('/:id/comment', auth, comment)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router
