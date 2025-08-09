import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'

function Add() {
  return (
    <div className='w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>
    </div>
  )
}

export default Add
