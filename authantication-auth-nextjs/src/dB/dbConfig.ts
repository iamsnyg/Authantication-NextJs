import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        mongoose.connection.on("connected", () => {
            console.log("Connected to the database");
        })
        mongoose.connection.on("error", (error) => {
            console.log("Error connecting to the database: ", error);
            process.exit();
        })
        
    } catch (error) {
        console.log("Error connecting to the database: ", error);
        
    }
}