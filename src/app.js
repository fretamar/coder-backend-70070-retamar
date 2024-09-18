import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/users.router.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import Handlebars from 'express-handlebars'
import __dirname from './utils.js'
import sessionRouter from './routes/sessions.js'

const fileStorage = FileStore(session)
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
app.set("views", __dirname + "views")
app.set("view engine", "handlebars")


app.use('/api/users', userRouter)
app.use('/', sessionRouter)


/*
app.get('/setCookie', (req,res) => {
    res.cookie('FranCookie', 'soy una cookie', {maxAge: 10000}).send('Cookie')
})

app.get('/getCookie', (req,res) => {
    res.send(req.cookies)
})

app.get('/deleteCookie', (req,res)=>{
    res.clearCookie('FranCookie').send("Cookie eliminada")
})


app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send("Bienvenido")
    }
})

app.get('/login', async (req, res) => {
    const {user, password} = req.query
    if (user !== "fretamar" || password !== "coder123"){
        res.send("Usuario o contraseña incorrecta")
    } else {
        req.session.user = user
        req.session.admin = true
        res.send("Login OK")
    }
})

function auth (req,res,next) {
    if(req.session?.user === "fretamar" && req.session?.admin){
        return next()
    }
    res.status(401).send("No estas autorizado")
}

app.get('/privado', auth, (req, res) => {
    res.send("Bienvenido a la sección privada")
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err){
            res.clearCookie('connect.sid')
            res.send("Logout ok")
        } else{
            res.send({ status: "Error al intentar salir", body: err })}
    })
})*/



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


