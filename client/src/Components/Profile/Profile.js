import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widgets/Widget'
import './Profile.css'
import ProfileOption from './ProfileOption'

export default function Profile() {
  return (
    <>
    <div className='Profile'>
        <Sidebar/>
        <ProfileOption/>
        <Widget/>
    </div>

<div className='RespProfile'>
<ProfileOption/>
<Sidebar/>
</div>
</>
  )
}