import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email: { type: String,
         required: true,
         match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ],
         unique: true },

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true ,select:false},
},{timestamps:true})

export default mongoose.model("User",userSchema)