import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import usersRoutes from './routes/user.js'

import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// app.get do exact match, app.use do partial match
app.use('/posts', postRoutes) // should be after cors
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    // For Heruko
    res.send('Hello to Memories API')
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            // eslint-disable-next-line no-console
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    // eslint-disable-next-line no-console
    .catch((error) => console.log(`${error} did not connect`))
