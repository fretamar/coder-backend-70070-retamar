import { Router } from 'express'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js'

const viewsRouter = Router()
/*
viewsRouter.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login')
})

viewsRouter.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register')
})

viewsRouter.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session.user })
})
*/

viewsRouter.get('/', async (req,res)=>{
    res.render('profile')
})

viewsRouter.get('/login', async (req,res)=>{
    res.render('login')
})
export default viewsRouter