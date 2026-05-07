import express from 'express'
import { login, logout, register } from '../controller/user_controller.js'
import authenticate from '../middleware/auth_middleware.js'

const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

export default router