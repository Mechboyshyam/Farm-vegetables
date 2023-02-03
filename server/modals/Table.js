import { Schema,model } from "mongoose";

const TableSchema = new Schema({
    tableNumber:Number,
    occupied:Boolean,
    occupiedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Table = model("table", TableSchema);
export default Table;