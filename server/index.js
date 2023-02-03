import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import User from "./modals/user.js"
import FoodItem from './modals/FoodItem.js'
import Table from './modals/Table.js';
const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL , ()=>{
    console.log("Connected to MongoDB...")
})

// API starts here
app.post("/signup", async(req,res)=>{
    const {name, phone, role , password, email} = req.body;

    const existingUser = await User.findOne({email:email});
    if (existingUser){
        return res.json({
            success:false,
            message:"email already exist"
        })
    }

    const existingPhone= await User.findOne({phone:phone})
    if (existingPhone){
        return res.json({
            success:false,
            message:"Phone already exist"
        })
    }

    const emptyFields =[];
    if (!name) emptyFields.push("name");
    if (!phone) emptyFields.push("phone");
    if (!email) emptyFields.push("email");
    if (!role) emptyFields.push("role");
    if (!password) emptyFields.push("password");

    if (emptyFields.length>0){
        return res.json({
            success:false,
            message: `${emptyFields.join(',')} are required.`
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

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }

    const  existingUser = await User.findOne({email:email, password:password});
    if (existingUser){
        return res.json({
            success:true,
            message:"Login successful" ,
            data:existingUser
        })
    }
    else{
        return res.json({
            success:false,
            message:"Invalid email or password"
        })
    }
})

app.post("/foodItem", async(req,res)=>{
    const {title,description,price,imgUrl,category}=req.body;

    const foodItem = new FoodItem({
        title:title,
        description:description,
        price:price,
        imgUrl:imgUrl,
        category:category
    })

    const savedFoodItem = await foodItem.save();

    res.json({
        success:true,
        message:"FoodItem created successfully",
        data:savedFoodItem
    })
})

app.get("/foodItemByCategory", async(req, res)=>{
    const {category} = req.query;

    const foodItem = await FoodItem.find({
        category:{$regex:category , $option:'i'}
    });
    res.json({
        success:true,
        message:"FootItem fetched successfully.",
        data:foodItem
    })
})

app.get("/foodItemByName", async(req,res)=>{
    const {title} =req.query;

    const foodItem = await FoodItem.find({
        title:{$regex:title, $options:'i'}
    });

    res.json({
        success:true,
        message:"FoodItem fetched successfully.",
        data:foodItem
    })
})

app.post("/createTable" , async(req,res)=>{
    const {tableNumber}= req.body;

    const existingTable = await Table.findOne({tableNumber:tableNumber});
    if (existingTable){
        return res.json({
            success:false,
            message:"Table already exist."
        })
    }
    const table = new Table({
        tableNumber:tableNumber,
        occupied:false
    })
    const savedTable = await table.save();
    res.json({
        success:true,
        message:"Table created succesfully",
        data:savedTable
    })
})

app.post("/bookTable" , async(req,res)=>{
    const {tableNumber, userId}=req.body;

    const existingTable = await Table.findOne({tableNumber:tableNumber});
    
    if (existingTable && existingTable.occupied){
        return res.json({
            success:false,
            message:"Table already booked"
        })
    }

    if (existingTable){
        existingTable.occupied=true,
        existingTable.occupiedBy= userId,
        await existingTable.save();
    }

    res.json({
        success:true,
        message:"Table booked successfully",
        data:existingTable
    })
})

app.post("/unbookTable", async(req,res)=>{
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({tableNumber:tableNumber});

    if (existingTable){
        existingTable.occupied=false,
        existingTable.occupiedBy=null,
        await existingTable.save();
    }

    res.json({
        success:true,
        message:"Table unbooked successfully",
        data:existingTable
    })
})
// API ends here




const PORT = process.env.PORT || 5000;
app.listen(`${PORT}`, ()=>{
    console.log(`Server is running on port ${PORT}`);
})