import React, { useEffect } from 'react'
import { loginRequired } from '../../util/LoginRequired'

function BookTable() {

    useEffect(()=>{
            loginRequired()
    })
  return (
    <div>BookTable</div>
  )
}

export default BookTable;