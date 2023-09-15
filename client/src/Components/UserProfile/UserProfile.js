import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widgets/Widget'
// import '../Profile/Profile.css'
import './UserProfile.css'
import UserProfileOption from './UserProfileOption'

export default function UserProfile() {
  return (
    <>
    <div className='Profile'>
        <Sidebar/>
        <UserProfileOption/>
        <Widget/>
    </div>

<div className='RespProfile'>
<UserProfileOption/>
<Sidebar/>
</div>
</>
  )
}