import {Schema, model} from "mongoose";

const FoodItemSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imgUrl:String,
    category:String
}) 

const FoodItem = model("foodItem", FoodItemSchema);

export default FoodItem;