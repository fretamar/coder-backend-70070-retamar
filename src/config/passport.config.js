import passport from 'passport'
import local from 'passport-local'
import { createHash, generateToken, authToken, isValidPassword } from '../utils.js'
import  {userModel}  from '../models/user.model.js'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const cookieExtractor = (req) => {
    let token = null
    console.log(req.headers)
    if(req && req.headers){
        token = req.headers.authorization.split(' ')[1]
    }
    return token
}


const initializePassport =()=>{

   passport.use('register', new LocalStrategy({
        passReqToCallback: true, usernameField: 'email'}, async(req,username,password,done)=>{
            const {first_name, last_name, email, age} = req.body
        try{
            let user = await userModel.findOne({email:username})
            if(user){
                console.log("El usuario existe")
                return done(null,false)
            }
            const newUser={
                first_name,
                last_name,
                email,
                age,
                password:createHash(password)
            }
            let result= await userModel.create(newUser)
            return done(null,result)
        }catch(error){
            return done("Error al obtener el usuario" + error)
        }}
    ))

  

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done)=>{
        try{
            const user = await userModel.findOne({email: username})
            if(!user){
                console.log("El usuario no existe")
                return done(null,false)
            }
            if(!isValidPassword(user,password)) return done(null, false)
                return done(null,user)
        }catch(error){
            return done(error)
        }
    }))

    //Autenticación con terceros - Github

    passport.use('github', new GithubStrategy({
        clientID: "Iv23liZkom7L0pUNQXkC",
        clientSecret: "80346e32e1df2e49404c4cb8d92fe31a86887a91",
        callbackURL: "http://localhost:8080/sessions/githubcallback",
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)
            let user= await userModel.findOne({email: profile._json.email})
            if(!user){
                let newUser ={
                    first_name: profile._json.name,
                    last_name: "",
                    age: 28,
                    email: profile._json.email, 
                    password: ""
                }
                let result = await userModel.create(newUser)
                done(null, result)
                const access_token = generateToken(newUser)
                res.status(201).send({access_token})
            }
            else{
                done(null,user)
            }
        } catch (error) {
            res.send(error)} 
    }))


    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser( async (id, done) => {
        let user = await userModel.findById(id)
        done(null,user)
    })

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'franSecret'
        }, async (jwt_payload, done) =>{
            try{
                return done(null,jwt_payload)
            } catch(error){
                return done(error)
            }

        })
    )


}

export default initializePassport
