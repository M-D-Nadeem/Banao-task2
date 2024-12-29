import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config

const jwtAuth=(req,res,next)=>{
    const token=(req.cookies.token) || null
    if(!token){
        return res.status(404).json({
            sucess:false,
            message:"Token does not exist"
        })
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET_CODE)
        req.user=payload
    } 
    catch(err){
        res.status(500).json({
            sucess:false,
            message:err.message
        })
    }
    next()
}

export default jwtAuth