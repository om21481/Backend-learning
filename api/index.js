import express from "express";
import jwt from "jsonwebtoken";
import dotev from "dotenv"
import mongoose from "mongoose";
import routerAuth from "./routes/auth.js";
import hotelRouter from "./routes/hotels.js"
import userRouter from "./routes/user.js"
import cookieparser from "cookie-parser"

dotev.config()
const app = express();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }
    catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB disconnected");
})

// middlewares
app.use(cookieparser())
app.use(express.json())
app.use("/auth", routerAuth);        // Now we can use this route
app.use("/hotels", hotelRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) =>{
    return res.status(err.status || 500).json({
        sucess: false,
        status: err.status || 500,
        message: err.message || "Something Wrong Happened",
        stack: err.stack
    })
})

app.get("/", (req, res) => {
    res.send({hello:"hello"})
})

app.listen(8800, () => {
    connect()
    console.log(`listening on port ${8001}`);
})