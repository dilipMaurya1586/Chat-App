
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected_!"));
        await mongoose.connect(`${process.env.MONGODB_URI}/char-app`)
    } catch (error) {
        console.log(error)
    }
}