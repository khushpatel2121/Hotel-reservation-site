import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "../api/Routes/users.js"
import authRoute from "../api/Routes/auth.js"
import hotelRoute from "../api/Routes/hotel.js"
import roomRoute from "../api/Routes/room.js"
import cookieParser from "cookie-parser";



const app = express();
dotenv.config();



mongoose.set('strictQuery', false);

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw(error);
  }
}

mongoose.connection.on('disconnected' , ()=>{
    console.log("mongoDB disconnected.")
});

mongoose.connection.on('connected' , ()=>{
  console.log("mongoDB connected.")
});

//middleware 

app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((err , req ,res, next )=>{
  const errorStatus = err.Status || 500;
  const errorMessage = err.Message || "Something went wrong"
  return res.status(500).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });
});


app.listen(8800, ()=>{
    connect();
    console.log("listing on  port 8800")
})

