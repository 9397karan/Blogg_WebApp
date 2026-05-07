import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user_model.js'

import dotenv from 'dotenv'

dotenv.config()
const register=async(req,res)=>{
    try{

    
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const existUser=await User.findOne({email})
    if(existUser){
        return res.status(201).json({
            message:"User already registered"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const new_user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    const refreshToken= await jwt.sign({id:new_user.id,name:new_user.name,email:new_user.email},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        maxAge:24*60*60*1000
    })

    res.status(200).json({
    message:"Registered Succesfully",
    user:new_user
})
} catch (error) {
    res.status(400).json({
        message:"Error in registeration. Try again..",
        error:error
    })
}
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                message:"All fields required"
            })
        }
        const exist_user= await User.findOne({email})
        if(!exist_user){
            return res.status(400).json({
                message:"Register First"
            })
        }

        const result=await bcrypt.compare(password,exist_user.password)
        if(!result){
            return res.status(400).json({
                message:"Incorrect email or password"
            })
        }
        const refreshToken=await jwt.sign({id:exist_user._id,name:exist_user.name,email:exist_user.email},process.env.JWT_SECRET,{
            expiresIn:'1d'
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            maxAge:24*60*60*1000
        })
        res.status(200).json({
            message:"Logged in"
        })
    } catch (error) {
        return res.status(400).json({
                message:"Failed to logged in",
                error:error
            })
    }
}

const logout=async(req,res)=>{
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })


        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true
        })

        return res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (error) {

        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        })
    }
}

export {register,login,logout}