import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNX)
        console.log("Base de datos online");
    } catch {
        throw new Error("Couldn't connect to MongoDB'")
    }
}

export default dbConnection