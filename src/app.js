import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Handlebars from 'express-handlebars'
import __dirname from './utils.js'
import userRouter from './routes/users.router.js'
import sessionRouter from './routes/sessions.js'
import viewsRouter from './routes/views.js'
import path from 'path'

const app = express()
const PORT = 8080

mongoose.connect('mongodb+srv://franretamar123:Knd281195.-@backendii.97uyg.mongodb.net/?retryWrites=true&w=majority&appName=BackendII')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franretamar123:Knd281195.-@backendii.97uyg.mongodb.net/?retryWrites=true&w=majority&appName=BackendII",
        mongoOptions: {},
        ttl: 15
    }),
    secret: "fran123",
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars", Handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")


app.use('/api/users', userRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


