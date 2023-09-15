import React from 'react'
import Feed from '../Feed/Feed'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widgets/Widget'
import './Home.css'
import logo from '../../assets/logo.png'

export default function Home() {
  return (
    <>
    <div className='Home'>
        <Sidebar/>
        <Feed/>
        <Widget/>
    </div>

    <div className="RespHome">
      <div className='img'>
    <img className='twitlogo' src={logo} alt="" />
    </div>
      <Feed/>
      <Sidebar/>
    </div>
    </>
  )
}