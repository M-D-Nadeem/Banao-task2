import express from "express"
import {register,login,forgotPassword} from "../controller/userController.js"

const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/forgotPassword",forgotPassword)

export default userRouter
