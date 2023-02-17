import React from "react";
import './Navbar.css'
// import swal from "sweetalert";
import {currentUser} from './../../util/currentUser.js'
import { Link } from "react-router-dom";

function Navbar(){
  async function logout(){
    if(currentUser){
      // await swal({
      //   title:"warning",
      //   text:"Are you sure?",
      //   icon:"warning",
      //   button:true,
      //   dangerMode:true
      // })

    //  await swal({
    //         title: "Are you sure?",
    //         type: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#DD6B55",
    //         confirmButtonText: "Log-out",
    //         closeOnConfirm: false
    //       // },
    //       //  function(){
    //       //     swal("Deleted!", "Your imaginary file has been deleted.", "success");
    //       });
      localStorage.removeItem('currentUser')
      window.location.href = '/login' 
    }
  }


    return (
        <div>
            
  <nav class="navbar navbar-expand-lg nav-bar">
  <div class="container-fluid">
    <a class="navbar-brand logo-project" href="#">FARM-VEGETABLE'S</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse title-nxt-div" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <a class="nav-link active font-weight" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item dropdown title-nxt-div-2">
          <a class="nav-link dropdown-toggle font-weight" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Order's
          </a>
          <ul class="dropdown-menu">
            <li><Link to='/myCart' className="text-decoration-none"><h6 class="dropdown-item font-weight">Cart</h6></Link></li>
            <li><a class="dropdown-item font-weight" href="#">Your order's</a></li>
            {/* <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Fruits</a></li> */}
          </ul>
        </li>
        <li className="search-box-row">
        <h3>Welcome,{currentUser?.name}.</h3>
        </li>
      </ul>
      <form class="d-flex">
        <button class="btn font-weight logout-btn" type="button" onClick={logout}>Logout</button>
      </form>
    </div>
  </div>
</nav>

        </div>
    )
}

export default Navbar;