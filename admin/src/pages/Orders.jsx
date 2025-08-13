import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'

function Orders() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]'>
      <Nav/>
      <div className='w-[100%] h-[100%] flex items-center lg:justify-start justify-center'>
        <Sidebar/> 
      </div>
    </div>
  )
}

export default Orders
