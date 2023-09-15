import React,{useState,useEffect} from 'react'
// import '../Profile/Profile.css'
import './UserProfile.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import twitterprofile from '../../assets/twitterprofile.webp'
import { Avatar } from '@mui/material'
import ProfImg from '../../assets/profileLogo.jpg'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
  import ProfileLo from '../../assets/profileLogo.jpg'
  import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
  import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
  import PublishIcon from '@mui/icons-material/Publish';
  import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import IosShareIcon from '@mui/icons-material/IosShare';


export default function UserProfileOption() {
  const navigate=useNavigate();
  var picLink="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
    const {userid} =useParams();
    console.log(userid)
    const[isFollow,setIsFollow]= useState(false);
    const[user,setUser]=useState("");
    const[posts,setPosts]=useState([]);


    // to follow user
    const followUser=(userId)=>{
      fetch("http://localhost:5000/follow",{
        method:"put",
        headers:{
          'Content-Type':'application/json',
           Authorization:"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          followId:userId
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setIsFollow(true)
      })
    }


        // to unfollow user
        const unfollowUser=(userId)=>{
          fetch("http://localhost:5000/unfollow",{
            method:"put",
            headers:{
              'Content-Type':'application/json',
              'Authorization':"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              followId:userId
            })
          })
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data)
            setIsFollow(false)
          })
        }


  useEffect(()=>{
    fetch(`http://localhost:5000/user/${userid}`,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':"Bearer "+localStorage.getItem("jwt")
      },
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      setUser(result.user)
      setPosts(result.post)
      if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
        setIsFollow(true)
      }
    })
  },[isFollow])

  return (
    <div className='ProfileOption'>
        <div className="ProfileHeader">
            <h2>{user.name}</h2>
            <p>{posts.length} Tweets</p>
            <KeyboardBackspaceIcon className='Arrow' onClick={()=>{navigate('/'); }}/>
        </div>
        <div className="ProfileImg">
            <img src={user.BgPhoto ? user.BgPhoto : ""} alt=""  className='banner'/>
            </div>
            <div className="UserImg">
            <Avatar className='ProfPic'
             alt="Remy Sharp"
             src={user.Photo ? user.Photo : picLink}
            sx={{ width: 130, height: 130 }}
            />
            <button className='Followbtn' 
            onClick={()=>{
              if(isFollow){
                unfollowUser(user._id)
              }
              else{
              followUser(user._id)}
            }}>
              {isFollow?"Unfollow":"Follow"}</button>
            </div>

            <div className="ProfileContent">
            <h2>{user.name}</h2>
            <p>@{user.userName}</p>
           <br />
           <p>{user.bio?user.bio : "Hey there! I am using twitter." }</p>
            <br />
            {/* <div className="Prof">
                <CakeOutlinedIcon/>
                <p>Born November 9, 2002</p>
                <CalendarMonthOutlinedIcon/>
                <p>Joined May 2020</p>
            </div> */}

            <div className="Following">
                <p><span>{user.following?user.following.length:"0"} </span> Following</p>
                <p><span>{user.followers?user.followers.length:"0"}</span> Followers</p>
            </div>

            <div className="ProfNav">
               <ul>
                <li>Tweets</li>
                <li>Replies</li>
                <li>Media</li>
                <li>Likes</li>
               </ul>
            </div>
            </div>

            <section className='ProfPost'>
            {posts.map(data=>(
              <div className='Post'>
              <div className="PostAvatar">
                   <Avatar 
                   src={user.Photo ? user.Photo : picLink}
                   />
               </div>
               <div className="PostBody">
                  <div className="PostHeader">
                      <div className="PostHeaderText">
                          <h3>{user.name}{"  "}
                              <span> 
                              @{user.userName}
                              </span>
                          </h3>
                          </div>
                  <div className="PostHeaderDescription">
                      <p>{data.body}</p>
                  </div>
              </div>
              <img src={data.photo} alt="" />
  
          <div className="PostFooter">
              <ChatBubbleOutlineOutlinedIcon fontSize='small' className='FooterIcon' />
              <RepeatOutlinedIcon fontSize='small' className='FooterIcon' />
                    <FavoriteIcon fontSize='small' className='FooterIcon'  sx={{ color: '#f91880' }}  />
              {/* <PublishIcon fontSize='small' className='FooterIcon' />    */}
              <IosShareIcon  fontSize='small' className='FooterIcon' /> 
          </div>
      </div>
  </div>

             ))} 
             </section>
    </div>
  )
}