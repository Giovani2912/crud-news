import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import newsRoute from './routes/news.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB!")
    }catch(error){
        throw error
    }
}

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/news", newsRoute);


app.listen(8800, ()=>{
    connect()
    console.log("Server is running.")
});