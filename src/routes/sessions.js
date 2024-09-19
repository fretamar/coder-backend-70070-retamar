
import { Router } from 'express'
import { userModel } from '../models/user.model.js'
import passport from 'passport'

const sessionRouter = Router()

sessionRouter.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
 res.send({status:"success", message:"Usuario registrado"})
})

sessionRouter.get('/failregister', async (req,res)=>{
    console.log("Estrategia fallida")
    res.send({error:"Error al registrar usuario"})
})     

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req, res) => {
    
    if (!req.user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" })
    
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }
        res.redirect('/profile')
  })

sessionRouter.get('/faillogin', (req,res) =>{
    res.send({error:"Login fallido"})
})

sessionRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión')
        res.redirect('/login')
    })
})

/*
sessionRouter.post('/reset-password', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ status: "error", error: "Usuario no encontrado" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({ status: "success", message: "Contraseña actualizada con éxito" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ status: "error", error: "Error interno del servidor" })
    }
})*/

export default sessionRouter
