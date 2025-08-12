import React from 'react'
import Logo from '../assets/logo.svg'

function Footer() {
  return (
    <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
      <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]'>
        <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px] '>
            <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px] '>
                <img src={Logo} className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
                <p className='text-[19px] md:text-[20px] text-black'>OneCart</p>
                <p className='text-[15px]'></p>
                <p></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
