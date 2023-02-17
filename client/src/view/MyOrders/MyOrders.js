import React, { useEffect } from 'react'
import { loginRequired } from '../../util/LoginRequired'
import axios from 'axios'

function MyOrders() {
    useEffect(()=>{
        loginRequired()
    })
  return (
    <div>
        
    </div>
  )
}

export default MyOrders