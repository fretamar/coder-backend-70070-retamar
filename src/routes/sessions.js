
import { Router } from 'express'
import { userModel } from '../models/user.model.js'
import passport from 'passport'
import { authorization, generateToken } from '../utils.js'
import { passportCall } from '../utils.js'

const sessionRouter = Router()

sessionRouter.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async (req, res) => {
 res.send({status:"success", message:"Usuario registrado"})
})

sessionRouter.get('/failregister', async (req,res)=>{
    console.log("Estrategia fallida")
    res.send({error:"Error al registrar usuario"})
})     

sessionRouter.post('/login', (req,res) => {
    const {email, password} = req.body
    if(email == "fran@gmail.com" && password == "fran123"){
        let token = jwt.sign({email, password, role: "user"}, "franSecret", {expiresIn: "24h"})
        res.send({message: "Inicio de sesion exitoso", token})
    }

})

sessionRouter.get('/current', passportCall('jwt'),authorization('user'),(req,res) =>{
    res.send(req.user)
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

sessionRouter.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{})

sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async(req,res)=>{
    req.session.user=req.user
    res.redirect('/ ')
})

export default sessionRouter
