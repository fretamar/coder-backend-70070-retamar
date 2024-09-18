import { Router } from 'express'
import { userModel } from '../models/user.model.js'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {
        console.log("No es posible obtener información de los usuarios", error)
    }
})

userRouter.post('/', async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body

    if (!first_name || !last_name || !email) {
        res.send({ status: "error", error: "Faltan parámetros" })
    }
    let result = await userModel.create({ first_name, last_name, email, age, password })
    res.send({ status: "success", payload: result })
})

userRouter.put('/:uid', async (req, res) => {
    let { uid } = req.params
    let userToReplace = req.body

    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        res.send({ status: "error", error: "Faltan parámetros" })
    }

    let result = await userModel.updateOne({ _id: uid }, userToReplace)
    res.send({ status: "Success", payload: result })
})

userRouter.delete('/:uid', async(req,res)=>{
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ status: "Success", payload: result })
})


export default userRouter