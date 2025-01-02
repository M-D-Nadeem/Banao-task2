import express from "express"
import dotenv from "dotenv"
import dbConnect from "./dbConnect.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routers/userRouter.js"
import postRouter from "./routers/postRouter.js"
import userPostRouter from "./routers/commentAndLikeRouter.js"
import cloudinary from "cloudinary"

dbConnect()
dotenv.config()
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))

app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/post",userPostRouter)

cloudinary.v2.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

const PORT=process.env.PORT || 7001
app.listen(PORT,()=>{ 
    console.log(`Server is running at http://localhost:${PORT}`);
})