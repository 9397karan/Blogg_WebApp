import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
async function db() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db connected")
    } catch (error) {
        console.error("Error in connecting to DB: ",error)
    }
}
export default db;