import mongoose from "mongoose" //ye data base se batchit ke liye

export const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected:${conn.connection.host}`);
    }catch(error){
      console.log("Error in connecting to mongoDB",error);
      process.exit(1);
    }
};