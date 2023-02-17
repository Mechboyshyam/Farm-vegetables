import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import swal from 'sweetalert';
import './Home.css';
import Navbar from '../../component/Navbar/Navbar';
import FoodItemCard from './../../component/FoodItemCard/FoodItemCard.js';
import { loginRequired } from '../../util/LoginRequired';

function Home() {

  const [searchText,setSearchText] = useState('')
  const [currentFoodItems,setAllFoodItems] = useState([])

  async function fetchAllItem(){
    console.log('fetching all items')
    const response = await axios.get('/allFoodItems')
    console.log(response.data.data)
    setAllFoodItems(response.data.data)
  }

  async function fetchSpecificItem(){
    console.log('fetching specific items')
    const response = await axios.get(`/foodItems?title=${searchText}`)
    console.log(response.data.data)
    setAllFoodItems(response.data.data)
  }

  useEffect(()=>{
    if (searchText.length > 0){
      fetchSpecificItem()
    }
    else{
      fetchAllItem()
    }
  },[searchText])

    useEffect(()=>{
        loginRequired()
    })

  return (
    <div><Navbar/>
      <div className='search-container'>
        <input class="search-box form-control"  placeholder="Search here..." 
        value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>  
      </div>    
      <div className='food-item-result'>
        <div className='row text-center'>
          {
            currentFoodItems?.map((FoodItem,index)=>{
                return(<FoodItemCard description={FoodItem.description} category={FoodItem.category} 
                title={FoodItem.title} price={FoodItem.price} 
                imgUrl={FoodItem.imgUrl} key={index}/>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home;