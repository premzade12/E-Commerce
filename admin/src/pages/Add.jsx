import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload.png'
import { useState } from 'react'

function Add() {
   const [image1, setimage1] = useState(false)
   const [image2, setimage2] = useState(false)
   const [image3, setimage3] = useState(false)
   const [image4, setimage4] = useState(false)
   const [name, setname] = useState("")
   const [description, setDescription] = useState("")
   const [category, setCategory] = useState("Men")
   const [price, setPrice] = useState("")
   const [subCategory, setSubCategory] = useState("TopWear")
   const [bestseller, setBestseller] = useState(false)
   const [sizes, setSizes] = useState([])

   const handleAddProduct = async (params) => {
     
   }
   

  return (
    <div className='w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0'>

      <form action="" className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]' >
        <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>
           Add Product Page
        </div>
        <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]'>
          <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>
          <div className='w-[100%] h-[100%] flex items-center justify-start'>
              <label htmlFor="image1" className='w-[65px] h-[65px] md:h-[100px] md:w-[100px] cursor-pointer hover:border-[#46d1f7]'>
                  <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" className='w-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                  <input type="file" id='image1' hidden onChange={(e)=>setimage1(e.target.files[0])} />
              </label>

              <label htmlFor="image2" className='w-[65px] h-[65px] md:h-[100px] md:w-[100px] cursor-pointer hover:border-[#46d1f7]'>
                  <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" className='w-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                  <input type="file" id='image2' hidden onChange={(e)=>setimage2(e.target.files[0])} />
              </label>

              <label htmlFor="image3" className='w-[65px] h-[65px] md:h-[100px] md:w-[100px] cursor-pointer hover:border-[#46d1f7]'>
                  <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" className='w-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                  <input type="file" id='image3' hidden onChange={(e)=>setimage3(e.target.files[0])} />
              </label>

              <label htmlFor="image4" className='w-[65px] h-[65px] md:h-[100px] md:w-[100px] cursor-pointer hover:border-[#46d1f7]'>
                  <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" className='w-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
                  <input type="file" id='image4' hidden onChange={(e)=>setimage4(e.target.files[0])} />
              </label>
          </div>
        </div>

        <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Name
            </p>
            <input type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'/>
        </div>

        <div className='w-[80%]  flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Description
            </p>
            <textarea type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px]  py-[10px] text-[18px] placeholder:text-[#ffffffc2]'/>
        </div>
        <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub-Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="WInterWear">WInterWear</option>
              </select>
            </div>
        </div>
         <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Price
            </p>
            <input type="number" placeholder=' ₹ 2000' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'/>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Add
