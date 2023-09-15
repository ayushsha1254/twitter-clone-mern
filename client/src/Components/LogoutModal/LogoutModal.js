import React from 'react'
import './LogoutModal.css'
import logo from '../../assets/logo.png'
import {useNavigate} from 'react-router-dom';

export default function LogoutModal() {
    const navigate=useNavigate();
  return (
    <div className="darkBg">
    <div className="centered">
    <div className='LogoutModal'>
        <div className="modalHeader">
        <img className='twitlogoutLogo' src={logo} alt="" />
            <h3 className='heading'>Log out of Twitter?</h3>
        </div>
        <div className="ModalContent">
        You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. 
        </div>
        <div className="modalActions">
            <div className="actionsContainer">
                <button className='logoutbtn' onClick={()=>{
                    localStorage.clear()
                    navigate('/signin')
                }}>Log out</button>
                <button className='cancelbtn' onClick={()=>{navigate('/'); }}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}