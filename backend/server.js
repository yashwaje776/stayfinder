import express from "express"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./config/db.js";
import UserRouter from "./routes/UserRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/RoomRoutes.js";
import BookingRouter from "./routes/BookingRoutes.js";


connectDB()
connectCloudinary()
const app =express();
const port=process.env.PORT || 3000
app.use(cors());
app.use(express.json())
//app.use(express.urlencoded({ extended: true }));

app.use('/api/user',UserRouter);
app.use('/api/rooms',roomRouter)
app.use('/api/booking',BookingRouter)

app.get('/',(req,res)=>{
    res.send("API IS WORKING")
})

app.listen(port,()=>console.log(`Server Runing on port http://localhost:${port}`))