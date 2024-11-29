import mongoose from "mongoose";


const connectDB= async()=>{
    try{
        
         await mongoose.connect(process.env.MONGO_URL);
         console.log("Mongo DB Connect");
         
    }
    catch(error){
       console.log("Error In Connecting DB:",error);
       process.exit(1) 
       
    }
}
export default connectDB