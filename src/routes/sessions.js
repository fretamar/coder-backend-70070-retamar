
import { Router } from 'express'
import {userModel} from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import { isValidObjectId } from 'mongoose'

const sessionRouter = Router()

sessionRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    try {
        const newUser = new userModel({ first_name, last_name, email, age, password:createHash(password)})
        await newUser.save()
        res.redirect('/login')
    } catch (err) {
        res.status(500).send('Error al registrar usuario')
    }
})

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

if(!email || !password) return res.status(400).send({status: "error", error:"Datos incompletos"})
    const user = await userModel.findOne({ email }, {email:1, first_name:1, last_name:1, password:1})
    if(!user) return res.status(400).send({status: "error", error: "Usuario no encontrado"})
    if(!isValidPassword(user,password)) return res.status(403).send({status:"error", error: "Usuario o contraseña incorrecto"})
        delete user.password
        req.session.user=user
        res.send({status: "succes", payload: user})
        res.redirect('/profile')
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión')
        res.redirect('/login')
    })
})

export default sessionRouter
