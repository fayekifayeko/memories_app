import express from 'express'
import { auth } from '../middleware/auth.js'

import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    getPost
} from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts) // no need to be authenticated
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.get('/search', getPostsBySearch)

export default router
