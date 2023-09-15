import React from 'react'
import './SidebarOption.css'

export default function SidebarOption({active,text,Icon}) {
  return (
    <div className={`SidebarOption ${active && 'SidebarOption--active'}`}>
        <Icon className="icon"/>
        <h2>{text}</h2>
    </div>
  )
}