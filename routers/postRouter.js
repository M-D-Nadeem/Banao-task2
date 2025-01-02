import express from "express"
import jwtAuth from "../middleware/userMiddleware.js"
import { addPost, deletePost, getAllPost, getPostById, updatePost } from "../controller/postController.js"
import upload from "../middleware/multerMiddleware.js"

const postRouter=express.Router()

postRouter.post("/add",jwtAuth,upload.single("image"),addPost)
postRouter.get("/getAll",getAllPost)
postRouter.get("/get/:id",jwtAuth,getPostById)
postRouter.put("/update/:id",jwtAuth,upload.single("image"),updatePost)
postRouter.delete("/delete/:id",jwtAuth,deletePost)

export default postRouter
