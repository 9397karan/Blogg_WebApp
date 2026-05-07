import { ImageKit } from "@imagekit/nodejs/client.js";
import dotenv from 'dotenv'

dotenv.config()
const client=new ImageKit({
    privateKey:process.env.IMAGEKIT_SECRET
})

async function uploadFile(buffer) {
    const result=await client.files.upload({
        file:buffer.toString('base64'),
        fileName:'image'
    })
    
}
module.exports=uploadFile