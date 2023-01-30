import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import User from "./modals/user.js"
const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL , ()=>{
    console.log("Connected to MongoDB...")
})

// API starts here
app.post("/signup", async(req,res)=>{
    const {name, phone, role , password, email} = req.body;

    const emptyFields =[];
    if (!name) emptyFields.push("name");
    if (!phone) emptyFields.push("phone");
    if (!email) emptyFields.push("email");
    if (!role) emptyFields.push("role");
    if (!password) emptyFields.push("password");

    if (emptyFields.length>0){
        return res.json({
            success:false,
            message: `${emptyFields.join(',')} are required...`
        })
    }


    const user = new User({
        name:name,
        phone:phone,
        role:role,
        password:password,
        email:email
    })

    const savedUser = await user.save();

    res.json({
        success:true,
        message:"User created successfully.",
        data:savedUser
    })
})

// API ends here




const PORT = process.env.PORT || 5000;
app.listen(`${PORT}`, ()=>{
    console.log(`Server is running on port ${PORT}`);
})