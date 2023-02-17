import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
// import path from "path";
// const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;

import User from "./modals/user.js"
import FoodItem from './modals/FoodItem.js'
import Table from './modals/Table.js';
import Order from './modals/Order.js'

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

app.get("/allFoodItems", async(req,res)=>{
    const foodItem = await FoodItem.find()

    res.json({
        success:true,
        message:'food item fetched succesfully',
        data: foodItem
    })
})

app.get('/foodItems', async(req,res)=>{
    const {title} = req.query;

    const foodItem = await FoodItem.find({
        title: {$regex: title, $options:'i'}
    })

    res.json({
        success:true,
        message: "Food item fetched successfully",
        data: foodItem
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

app.get("/availableTables" , async(req,res)=>{

    const availableTables = await Table.find({occupied:false});

    res.json({
        success:true,
        message:"Available tables fectched successfully",
        data:availableTables
    })
})

app.post("/orderFoodItems" , async(req,res)=>{
    const {userId, tableNumber, items} = req.body;

    const totalOrder = await Order.countDocuments();
    const orderId = totalOrder + 1;

    const order = new Order({
        userId:userId,
        orderId:orderId,
        tableNumber:tableNumber,
        items:items
    })

    const savedOrder = await order.save();

    res.json({
        success:true,
        message:"Order placed",
        data:savedOrder
    })
})

app.get("/order", async(req,res)=>{
    const {orderId} = req.query;

    const order = await Order.findOne({orderId:orderId});

    res.json({
        success:true,
        message:"Your ordered items",
        data:order
    })
})

app.get("/orderByUserId", async(req,res)=>{
    const {userId} = req.query;

    const order = await Order.find({userId:userId});

    res.json({
        success:true,
        message:"Order fetched successfully",
        data:order
    })
})
// API ends here

// api routes ends here
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// app.get('*', (req, res) => {
// res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})