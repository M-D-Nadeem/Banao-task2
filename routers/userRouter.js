import express from "express"
import {register,login,forgotPassword, logOut} from "../controller/userController.js"
import jwtAuth from "../middleware/userMiddleware.js"

const userRouter=express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.get("/logout",jwtAuth,logOut)

export default userRouter
