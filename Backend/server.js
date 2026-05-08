import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './utils/db_connect_service.js'

import userRoute from './route/user_route.js'
import postRoute from './route/post_route.js'
const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/user',userRoute)
app.use('/post',postRoute)
db();
app.listen(3000,()=>{
    console.log('server is listening to port 3000')
})