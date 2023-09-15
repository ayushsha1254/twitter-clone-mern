import React, {useState} from 'react'
import logo from '../../../assets/logo.png'
import './SignUp.css'
import googlelogo from '../../../assets/google.png'
import applelogo from '../../../assets/apple.png'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../Login'

export default function SignUp() {
  // API
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
const[message,setMessage]=useState("");
 const Navigate=useNavigate();
  const postData=()=>{
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        userName:userName,
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        setMessage(data.error);
        console.log(data.error);
      }else{
        console.log(data.message);
        setMessage(data.message);
        Navigate('/signin');
      }
     
   
    })
    .catch(err=>console.log(err))
  }
 

  return (
    <div className='SignUp'>
       <style>{'body { background-color: #3e65fe; }'}</style>
       <Login/>
        <div className="formContainer">
            <img className='signuplogo' src={logo} alt="" />
            <h2>
                 Welcome To Twitter India 
            </h2>
            {/* <button>
          <img src={googlelogo} alt="" />
          Sign up with Google
        </button>
        <button>
          <img src={applelogo} alt="" />
          Sign up with Apple
        </button>
        <hr />
        <span>or</span> */}

       <p className='signup'>{message}</p>
        
          <div>
          <input type="email" name='email' id='email' value={email} placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}  />
          </div>
          <div>
          <input type="text" name='name' id='name' value={name} placeholder='Full Name'  onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div>
          <input type="text" name='username' id='username' value={userName} placeholder='username' onChange={(e)=>{setUserName(e.target.value)}} />
          </div>
          <div>
          <input type="password" name='password' id='password' value={password} placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          {/* <input type="submit" id='submit-btn' value="Sign Up"/>  */}
          <button id='submit-btn' value="Sign Up" onClick={postData}>Sign Up</button>
      
           
         <p className='signUpdownPara'>
            By signing up, you agree to the <a href="https://twitter.com/en/tos" target="_blank"> Terms of Service</a> and <a href="https://twitter.com/en/privacy" target="_blank"> Privacy Policy</a>, including <a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies" target="_blank">Cookie Use.</a>
            </p>
            <br />
            <p className='respon'>Already have an account?<Link to="/signin">Sign in</Link></p>
            
        </div>
    </div>
  )
}