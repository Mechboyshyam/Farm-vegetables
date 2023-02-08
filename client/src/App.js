import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar.js'

function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path='/navbar' element={<Navbar />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
