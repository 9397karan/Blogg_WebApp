import express from 'express'
import authenticate from '../middleware/auth_middleware.js'
import upload from '../utils/multer.service.js'
import { createPost, deletePost, getAllPosts, getSinglePost } from '../controller/post_controller.js'
const router=express.Router()

router.post('/create',authenticate,upload.single('image'),createPost)
router.get('/get-all-post',authenticate,getAllPosts)
router.get('/get-post/:id',authenticate,getSinglePost)
router.post('/delete-post/:id',authenticate,deletePost)

export default router