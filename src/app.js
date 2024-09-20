import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Handlebars from 'express-handlebars'
import __dirname from './utils.js'
import sessionRouter from './routes/sessions.js'
import viewsRouter from './routes/views.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'


const app = express()
const PORT = 8080

mongoose.connect('mongodb+srv://franretamar123:Knd281195.-@backendii.97uyg.mongodb.net/?retryWrites=true&w=majority&appName=BackendII')

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franretamar123:Knd281195.-@backendii.97uyg.mongodb.net/?retryWrites=true&w=majority&appName=BackendII",
        mongoOptions: {},
        ttl: 15
    }),
    secret: "franSecret",
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", Handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")


app.use('/sessions', sessionRouter)
app.use('/', viewsRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


