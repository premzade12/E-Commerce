import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
function Nav() {
    let naviage= useNavigate()
  return (
    <div className='w-screen h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=>naviage("/")}>
            <img src={logo} alt="" className='w-[30px]'/>
            <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
            <button className='text-[]'></button>
        </div>
      
    </div>
  )
}

export default Nav
