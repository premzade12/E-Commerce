import React from 'react'
import Title from './Title'

function LatestCollection() {
  return (
    <div>
        <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
            <Title text1={Latest} text2={COLLECTIONS}/>
            <p>Step Into Style - New Collection Dropping This Season! </p>
        </div>
    </div>
  )
}

export default LatestCollection