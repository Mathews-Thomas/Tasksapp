import express  from "express";
import mongoose from "mongoose";
import taskSchema from "../models/taskSchema.js";
const router = express.Router();

router.post("/addtask", async (req,res)=>{
    const {task} = req.body;
    try {
        const newTask = new taskSchema({
            task
        })
        await newTask.save();
        
        res.status(200).json({message: "Task added successfully", data: newTask})
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.get("/listalltasks", async (req,res)=>{
    try {
        const tasks = await taskSchema.find();
        res.status(200).json({message: "Tasks fetched successfully", data: tasks}) 
    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.delete("/deletetask/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        await taskSchema.findByIdAndDelete(id);
        res.status(200).json({message: "Task deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router