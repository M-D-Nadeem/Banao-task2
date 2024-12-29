import express from "express"
import jwtAuth from "../middleware/userMiddleware.js"
import { addPost, deletePost, getAllPost, getPostById, updatePost } from "../controller/postController.js"

const postRouter=express.Router()

postRouter.post("/add",jwtAuth,addPost)
postRouter.get("/getAll",jwtAuth,getAllPost)
postRouter.get("/get/:id",jwtAuth,getPostById)
postRouter.put("/update/:id",jwtAuth,updatePost)
postRouter.delete("/delete/:id",jwtAuth,deletePost)

export default postRouter
