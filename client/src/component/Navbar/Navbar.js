import React from "react";
import './Navbar.css'
import {currentUser} from './../../util/currentUser.js'

function Navbar(){
    return (
        <div>
            
  <nav class="navbar navbar-expand-lg nav-bar">
  <div class="container-fluid">
    <a class="navbar-brand logo-project">FARM-VEGETABLE'S</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse title-nxt-div" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item dropdown title-nxt-div-2">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Green Vegetable's</a></li>
            <li><a class="dropdown-item" href="#">Fresh Vegetable's</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Fruits</a></li>
          </ul>
        </li>
        <li className="search-box-row">
        <h3>Welcome,{currentUser?.name}.</h3>
        </li>
      </ul>
      <form class="d-flex">
        <button class="btn" type="button">Profile</button>
      </form>
    </div>
  </div>
</nav>

        </div>
    )
}

export default Navbar;