import express from 'express'
import { login, logout, register } from '../controller/user_controller.js'
import authenticate from '../middleware/auth_middleware.js'

const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get("/check-auth", authenticate, (req, res) => {

    return res.status(200).json({
        success: true
    })

})
export default router