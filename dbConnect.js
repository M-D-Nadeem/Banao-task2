import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const dbConnect=()=>{

    mongoose.connect(process.env.MONGO_URI)
    .then((con)=>{
        console.log("Sucessfully connected to database: ",con.connection.host);
    })
    .catch((err)=>{
        console.log("Failed to connect to database",err);
        process.exit(1) 
    })
}

export default dbConnect 