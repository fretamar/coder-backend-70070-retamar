import { dirname } from 'path'
import { fileURLToPath } from "url"
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import jwt from 'jsonwebtoken'

export default __dirname

//Hash de contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//Validacion de contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

//JWT
const PRIVATE_KEY = "Fran1234"

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: "24h"})
    return token
}

const authToken = (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).send({error: "No autenticado"})
        const token = authHeader.split(" ")[1]

    jwt.verify(token, PRIVATE_KEY, (error, credentials) =>{
        if (error) return res.status(403).send({error: "No estas autorizado"})
            req.user = credentials.user
        next()
    })
}

export {generateToken, authToken}

 export const passportCall = (strategy) =>{
    return async (req,res,next)=>{
        passport.authenticate(strategy, function(err,user,info){
            if (err){
                return next(err)
            }
            if(!user){
                return res.status(401).send({error: info.messages ? info.messages: info.toString()})
            }
            req.user = user
            next()
        })
        (req,res,next)
    }
 }

 export const authorization = (role) => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({error: "Unauthorized"})
        if(req.user.role !== role) return res.status(403).send({error: "No permission"})
            next()
        }
 }