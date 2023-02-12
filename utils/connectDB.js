import mongoose from "mongoose";

const DB = process.env.DATABASE;


const connectDB = async function() {
    await mongoose.connect(DB);
    console.log('Connect to DB Successfully');
}
mongoose.set('strictQuery', true)

connectDB()
