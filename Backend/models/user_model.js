import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},{timestamps:true})

export default mongoose.model('User',userSchema)