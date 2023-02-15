import React,{useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './Signup.css';
import { currentUser } from '../../util/currentUser';

function Signup() {

    useEffect(()=>{
        if(currentUser){
          window.location.href= '/'
        }
      },[])

    const [name,setName ] = useState('');
    const [phone,setPhone ] = useState('');
    const [email,setEmail ] = useState('');
    const [password,setPassword ] = useState('');
    const [role,setRole ] = useState('User');

    async function signupUser(){
        const response = await axios.post('/signup',{
            name:name,
            phone:phone,
            email:email,
            password:password,
            role:role
        })
        console.log(response.data)
        if(response.data.success){
            await swal({
                title:"Success",
                text:(response.data.message),
                icon:"success"
              })
            window.location.href= '/login'
        }
        else{
            swal({
                title:"Error",
                text:(response.data.message),
                icon:"error"
              })
            setEmail('')
            setName('')
            setPassword('')
            setPhone('')
        }
    }

    function login(){
        window.location.href= '/login'
    }

  return (
        <div>
             <div className='d-flex'>
                <div className='col-4 '></div>
                    <div className='col-4 signup-title'>
                        <h2 className='mt-2 signup-title-logo'>Signup here</h2>
                    </div>
                <div className='col-4 '></div>
             </div>

             <div className='d-flex card-box mt-3'>
                <div className='col-md-4'></div>
                    <div className='signup-box col-md-4'>

                      <div className='row'>
                          <span className='title mt-4'>Name</span>
                          <input className='text-box form-control' type='text' placeholder='Enter full name' 
                          value={name} onChange={(e)=>setName(e.target.value)} />
                      </div>

                      <div className='row'>
                          <span className='title'>Email</span>
                          <input className='text-box form-control' type='text' placeholder='Enter email' 
                          value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </div>

                      <div className='row'>
                          <span className='title'>Phone</span>
                          <input className='text-box form-control' type='text' placeholder='Enter mobile number'
                          value={phone} onChange={(e)=>setPhone(e.target.value)} />
                      </div>

                      <div className='row'>
                          <span className='title'>Password</span>
                          <input className='text-box form-control' type='password' placeholder='Enter password'
                          value={password} onChange={(e)=>setPassword(e.target.value)} />
                      </div>

                      <div className='signup-btn'>
                          <button className='btn btn-success' onClick={signupUser}>Signup</button>
                      </div>

                      <hr/>

                      <div className='mt-3 me-5'>
                        <h6><span className='last-line'>Already have an account? click here to</span> <span className='login' onClick={login}><b>Log-in</b></span></h6>
                      </div>

                    </div>
                <div className='col-md-4'></div>
            </div>
        </div>
  )
}

export default Signup;