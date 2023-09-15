import React from 'react'
import { Link } from 'react-router-dom'
import sad from "../../assets/sad.png"
import "./Message.css"
import Sidebar from '../Sidebar/Sidebar'

export default function Message() {
  return (
    <>
    <div className="Message">
        <img src={sad} alt=""  className='Sad'/>
        <h1>OOPS!</h1>
        <p>This section is under development</p>
        <p>You can explore <Link to="/">Home section </Link>now.</p>
    </div>
    <Sidebar/>
    </>
  )
}