import express from 'express'
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/posts.js'
import {auth} from '../middleware/auth';

const router = express.Router()

router.get('/', getPosts) // no need to be authenticated
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router
