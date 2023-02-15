import React, {useState, useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import './Login.css'
import { currentUser } from '../../util/currentUser';

function Login() {

  useEffect(()=>{
    if(currentUser){
      window.location.href= '/'
    }
  },[])

  const [email,setEmail ] = useState('');
  const [password,setPassword ] = useState('');

    async function loginUser(){
      const response = await axios.post('/login',{
        email:email,
        password:password
      })
      if(response.data.success){
        await swal({
          title:"success",
          text:(response.data.message),
          icon:"success"
        })
        // alert(response.data.message)
        localStorage.setItem('currentUser',JSON.stringify(response.data.data))
        window.location.href= '/'
      }
      else{
        swal({
          title:"Error",
          text:(response.data.message),
          icon:"error"
        })
        setEmail('')
        setPassword('')
        localStorage.removeItem('currentUser')
      }
    }


    function signup(){
      window.location.href= '/signup'
    }

  return (
    <div>
      <div>
        <div className='d-flex'>
                <div className='col-4 '></div>
                    <div className='col-4 login-title'>
                        <h2 className='mt-2 login-title-logo'>Login</h2>
                    </div>
                <div className='col-4 '></div>
        </div>

        <div className='d-flex card-box mt-3'>
                <div className='col-md-4'></div>
                    <div className='login-box col-md-4'>

                      <div className='row'>
                          <span className='title'>Email</span>
                          <input className='text-box form-control' type='text' placeholder='Enter email' 
                           value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </div>

                      <div className='row'>
                          <span className='title'>Password</span>
                          <input className='text-box form-control' type='password' placeholder='Enter password'
                           value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      </div>

                      <div className='login-btn'>
                          <button className='btn btn-success' onClick={loginUser}>Login</button>
                      </div>

                      <hr/>

                      <div className='mt-4 me-5'>
                        <h6>Don't have an account? click here to <span className='signup' onClick={signup}>Sign-up</span></h6>
                      </div>

                    </div>
                <div className='col-md-4'></div>
            </div>
      </div>
    </div>
  )
}

export default Login;