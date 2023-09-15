/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
// import LoginPage from './Components/LoginPage/Login';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Components/Home/Home';
import SignUp from './Components/LoginPage/SignUp/SignUp';
import SignIn from './Components/LoginPage/SignIn/SignIn';
import Profile from './Components/Profile/Profile';
import LogoutModal from './Components/LogoutModal/LogoutModal';
import UserProfile from './Components/UserProfile/UserProfile';
import MyFollowing from './Components/MyFollowing/MyFollowing';
import Tweet from './Components/Tweet/Tweet';
import Message from './Components/Message/Message';
import { useEffect, useState } from 'react';

function App() {
  const[token,setToken]=useState("")
  const navigate=useNavigate();
  const checkToken=()=>{
    const tokenVal=localStorage.getItem('jwt');
    if(!tokenVal){
      console.log("I dont have token");
      navigate('/signin')
    }
    else{
      console.log('I have token');
      setToken(tokenVal)
      // navigate('/')
    }
  }
  useEffect(()=>{
    checkToken();
  },[token])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/logout" element={<LogoutModal/>}></Route>
        <Route path="/profile/:userid" element={<UserProfile/>}></Route>
        <Route path="/followingpost" element={<MyFollowing/>}></Route>
        <Route path="/createPost" element={<Tweet/>}></Route>
        <Route path="/message" element={<Message/>}></Route>
      </Routes>
    </div>
  );
}

export default App;