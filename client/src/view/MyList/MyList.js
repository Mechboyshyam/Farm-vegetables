import React from 'react'
import axios from 'axios';
import swal from 'sweetalert';

import {currentUser} from '../../util/currentUser.js'
import './MyList.css'
import Navbar from '../../component/Navbar/Navbar.js';
import { myFoodListItems } from '../../util/MyList.js';

function MyList() {

  async function placeFoodOrder(){
    const response = await axios.post("/orderFoodItems", {
      userId: currentUser._id,
      tableNumber: localStorage.getItem("tableNumber") || 1,
      items: myFoodListItems
    })

    if(response.data.success){
     await swal(
        "Order placed", response.data.message, "success")
        localStorage.removeItem("list")
        window.location.href='/'

    }
  }
  return (
    <div>
      <Navbar/>
      <h1 className='text-center'>MyList</h1>
      {
        myFoodListItems.map((item, index)=>{
          return (
          <div className=' row'>
            <div className='col-4'></div>
              <div className='col-4 item-box'>
                <span className='box-item'>Name: {item.name}</span><br/>
                <span className='box-item'>Quantity: {item.quantity}</span><br/>
                <span className='box-item'>Price: {item.price}</span>
                <hr/>
              </div>
            <div className='col-4'></div>
          </div>)
        })
      }
      <button className='btn btn-success order-btn' onClick={placeFoodOrder}>Confirm Order</button>
    </div>
  )
}

export default MyList;