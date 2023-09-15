import React from 'react'
import '../LoginPage/Login.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='LoginPage'>
        <img src={logo} alt="" />
        <ul className='NavMenu'>
           <Link to="/signin"><li>Log in</li></Link> 
           <Link to="/signup"><li>Sign up</li></Link> 
        </ul>
    </div>
  )
}