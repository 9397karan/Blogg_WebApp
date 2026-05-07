import mongoose from "mongoose";

const postSchema=mongoose.Schema({
    title:String,
    content:String,
    image:{
        type:String,
        default:''
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

export default mongoose.model('Post',postSchema)