import express from "express"
import jwtAuth from "../middleware/userMiddleware.js"
import { addComment, addLike, disLike } from "../controller/commentsAndLikeController.js"

const userPostRouter=express.Router()

userPostRouter.post("/comment/:id",jwtAuth,addComment)
userPostRouter.post("/like/:id",jwtAuth,addLike)
userPostRouter.post("/dislike/:id",jwtAuth,disLike)

export default userPostRouter