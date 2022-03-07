import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const { page } = req.query
        
        const postsPerPage = 2
        const skipNumber = (Number(page) - 1) * postsPerPage
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(postsPerPage)
            .skip(skipNumber)

        res.status(200).json({
            data: posts,
            numberOfPages: Math.ceil((total/postsPerPage)),
            currentPage: Number(page),
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await PostMessage.findById(id);

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    })

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with this id')
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            { ...post, _id },
            { new: true }
        )

        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with this id')
    try {
        await PostMessage.findByIdAndRemove(_id)

        res.json({ message: 'Post has been deleted successfully!' })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params
    if (!req.userId)
        return res.status(401).json({ message: 'You are not authenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with this id')
    try {
        const post = await PostMessage.findById(_id)
        const index = post.likes.findIndex(
            (item) => item === String(req.userId)
        )

        if (index === -1) {
            // like
            post.likes.push(req.userId)
        } else {
            // dislike
            post.likes = post.likes.filter(
                (item) => item !== String(req.userId)
            )
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
            new: true,
        })

        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchTerm, tags } = req.query

    try {
        const title = new RegExp(searchTerm, 'i') // ignore case
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(',') } }],
        })
        res.json({ data: posts })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const comment = async (req, res) => {
    const { id: _id } = req.params
    const {comment} = req.body;

    if (!req.userId)

        return res.status(401).json({ message: 'You are not authenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with this id')
    try {
        const post = await PostMessage.findById(_id)
        post.comments.push(comment);
        
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
            new: true,
        })

        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
