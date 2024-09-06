import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import database from "./config/database.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const port =  process.env.PORT

app.use("/api",taskRouter)

app.listen(port , ()=>{
    database()
    console.log(`Server is running on port ${port}`)
})

