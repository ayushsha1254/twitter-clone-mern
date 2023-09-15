import React from 'react'
import './Widget.css'
import {
  TwitterTweetEmbed,
} from "react-twitter-embed"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Widget() {
  return (
    <div className='Widget'>
      <div className="WidgetInput">
      <SearchOutlinedIcon className='searchIcon'/>
      <input type="text" placeholder='Search Twitter' />
      </div>

      <div className="WidgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId={"1636380667897581574"}/>
        <TwitterTweetEmbed tweetId={"1631178610080980992"}/>
      </div>
    </div>
  )
}