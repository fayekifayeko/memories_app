import express from 'express'
import {
    signin,
    signup
} from '../controllers/user'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)