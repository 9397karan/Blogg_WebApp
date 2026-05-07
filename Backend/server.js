import express from 'express'
import cors from 'cors'

import db from './utils/db_connect_service.js'

const app=express()

app.use(express.json())
app.use(cors())

db();
app.listen(3000,()=>{
    console.log('server is listening to port 3000')
})