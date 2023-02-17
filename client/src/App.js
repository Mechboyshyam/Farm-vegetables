import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './view/Home/Home.js';
import Login from './view/Login/Login';
import Signup from './view/Signup/Signup';
import FoodItemCard from './component/FoodItemCard/FoodItemCard.js'
import BookTable from './view/BookTable/BookTable';
import MyOrders from './view/MyOrders/MyOrders';
import MyList from './view/MyList/MyList.js';

function App() {
  return (
    <div className='app'>
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/card' element={<FoodItemCard />} />
          <Route path='/bookTable' element={<BookTable />} />
          <Route path='/myOrders' element={<MyOrders/> } />
          <Route path='/myCart' element={<MyList/> } />
      </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
