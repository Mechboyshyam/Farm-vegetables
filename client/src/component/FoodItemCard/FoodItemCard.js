import React, {useState} from 'react'
import './FoodItemCard.css'
import swal from 'sweetalert'

function FoodItemCard({ category, description, imgUrl, price, title }) {

  const [quantity, setQuantity] = useState(1)

  async function addToList(){
   const listObject = {
     name: title,
     price: price,
     quantity: quantity
   }

   const existingList = JSON.parse(localStorage.getItem('list')) || []

   existingList.push(listObject)

   localStorage.setItem('list', JSON.stringify(existingList))

   await swal({
      title: "Added to List",
      icon: "success",
   })
   window.location.reload()
  }

  return (
    <div className='col-md-3'>
      <div className="food-item-card">
        <div>
          <img src={imgUrl} class="food-item-card-header-img" alt='img' />
        </div>

        <div className='info-card'>
          <h3 className='title-item'>{title}</h3>
          <span>{description || title}</span><br/>
          <span className='price-box'>{price}/- Only</span><br/>
          {/* <span>{category}</span> */}
        </div>

        <div className='quantity-btn-container'>
          <span className='qnt-btn' onClick={(e)=>{setQuantity(quantity-1)}}>-</span>
          <span className='qnt-text'>{quantity}</span>
          <span className='qnt-btn' onClick={(e)=>{setQuantity(quantity+1)}}>+</span>
        </div>

        <div>
          <button type="button" className='btn-add-to-list' onClick={addToList}>Add To List</button>
        </div>
      </div>
    </div>
  )
}

export default FoodItemCard;