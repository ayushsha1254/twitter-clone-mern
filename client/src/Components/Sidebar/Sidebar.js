import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import SidebarOption from './SidebarOption'
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import ProfileLo from '../../assets/profileLogo.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import tweet from '../../assets/tweet.png'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate=useNavigate()
  const [userphoto,setUserphoto] = useState("")

  useEffect(()=>{
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))?._id}`,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':"Bearer "+localStorage.getItem("jwt")
    }
  })
  .then(res=>res.json())
  .then((result)=>{
    console.log(result)
    setUserphoto(result.user.Photo)
  })
},[])

  return (
    <>
    <div className='Sidebar'>
        <img className='twitlogo' src={logo} alt="" onClick={()=>{navigate("/")}} />
        <Link to="/" style={{textDecoration: "none", color:"black"}}>  <SidebarOption active Icon={HomeIcon} text="Home"/></Link> 
        <SidebarOption Icon={TagIcon} text="Explore"/> 
        <SidebarOption Icon={MailOutlineIcon} text="Messages"/> 
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/> 
       <Link to="/profile" style={{textDecoration: "none", color:"black"}}> <SidebarOption Icon={PersonOutlineOutlinedIcon} text="Profile"/></Link> 
        <Link to="/logout" style={{textDecoration: "none", color:"black"}}><SidebarOption Icon={LogoutIcon } text="Logout"/></Link> 

        <button className='tweet'>Tweet</button>  

        <div className="ProfLogOut">
         <Avatar src={userphoto?userphoto:""}/>
         <div>
         <h4>{JSON.parse(localStorage.getItem("user"))?.name}</h4>
          <p>@{JSON.parse(localStorage.getItem("user"))?.userName}</p>
         </div>
         <MoreHorizIcon style={{cursor:"pointer"}}/>
         
          </div>     
    </div>

    <div className="RespSidebar">
    <div className="Nav">
    <Link to="/" style={{textDecoration: "none", color:"black"}}>  <HomeIcon className='BottomLogo'/></Link>
    <Link to="/createPost" style={{textDecoration: "none", color:"black"}}>  <img className='tweetIcon' src={tweet} alt="" /></Link> 
      <Link to="/profile" style={{textDecoration: "none", color:"black"}}>   <PersonOutlineOutlinedIcon className='BottomLogo'/></Link>
    <Link to="/message"  style={{textDecoration: "none", color:"black"}}>< MailOutlineIcon className='BottomLogo'/></Link>

      <Link to="/logout" style={{textDecoration: "none", color:"black"}}> <LogoutIcon className='BottomLogo'/></Link>

    </div>
    </div>
    </>
  )
}