import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './view/Home/Home.js';
import Login from './view/Login/Login';
import Signup from './view/Signup/Signup';
import FoodItemCard from './component/FoodItemCard/FoodItemCard.js'

function App() {
  return (
    <div className='app'>
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/card' element={<FoodItemCard />} />
      </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
