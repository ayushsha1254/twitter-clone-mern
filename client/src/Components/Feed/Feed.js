import React from 'react'
import Post from '../Post/Post'
import Tweet from '../Tweet/Tweet'
import './Feed.css'
import { Link } from 'react-router-dom'


export default function Feed() {
  return (
    <>
    <div className='Feed'>
        <div className="Feed_header">
            <h2>Home</h2>
            <div className="subFeed_header">
           <Link to="/" style={{textDecoration: "none"}}><h3 className='activeLink'>For you</h3></Link> 
           <Link to="/followingpost" style={{textDecoration: "none"}}><h3 >Following</h3></Link> 
            </div>
        </div>

        {/* Tweet box */}
        <Tweet/>

        {/* Post */}
        <Post/>
    </div>

    <div className="RespFeed">
    <div className="Feed_header">
            <h2>Home</h2>
            <div className="subFeed_header">
           <Link to="/" style={{textDecoration: "none"}}><h3 className='activeLink'>For you</h3></Link> 
           <Link to="/followingpost" style={{textDecoration: "none"}}><h3 >Following</h3></Link> 
            </div>
        </div>
        
        {/* Post */}
        <Post/>
    </div>
    </>
  )
}