import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log('DB Connection Successfull!')
    } catch (error) {
        console.log('Error while DB Connection!',error.message)
    }
}

export default connectDB