import React,{useState} from 'react'
import logo from '../../../assets/logo.png'
import './SignIn.css'
import googlelogo from '../../../assets/google.png'
import applelogo from '../../../assets/apple.png'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../Login'
export default function SignIn() {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const Navigate=useNavigate();
const[message,setMessage]=useState('');
  const LoginData=()=>{
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        setMessage(data.error);
       console.log(data.error);
        
      }else{
      setMessage(data.message);
      console.log(data)
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      Navigate('/');
     console.log(data.message);
      }
     
    })
    .catch(err=>console.log(err))
  }
 

  return (
    <div className='SignIn'>
        <style>{'body { background-color: #3e65fe; }'}</style>
      <Login/>
        <div className="formContainer1">
        <img className='signinlogo' src={logo} alt="" />
        <h2>Sign in to Twitter</h2>
        {/* <button>
          <img src={googlelogo} alt="" />
          Sign in with Google
        </button>
        <button>
          <img src={applelogo} alt="" />
          Sign in with Apple
        </button>
        <hr />
        <span>or</span> */}

       <p className='message'>{message}</p>
          <input type="text" placeholder='email address' onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}}></input> 
          <button id='signin' onClick={LoginData}>Next</button>
      
        {/* <button>Forgot password</button> */}
        <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    </div>
  )
}