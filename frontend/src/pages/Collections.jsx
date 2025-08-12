import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function Collections() {

  let [showFilter, setShowFilter] = useState(false);
  let { products } = useContext(shopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProduct(productCopy)
  }

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();
  }

  useEffect(() => {
    setFilterProduct(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory])

  return (
    <div className='
      w-[99vw] min-h-[100vh] 
      bg-gradient-to-l from-[#141414] to-[#0c2025] 
      flex flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-[2]'>

      {/* Filter Sidebar */}
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] 
        ${showFilter ? "h-[45vh]" : "h-[8vh]"} p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] 
        lg:fixed lg:top-[70px] lg:left-0 lg:z-10 bg-[#141414]`}>

        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer'
          onClick={() => setShowFilter(prev => !prev)}>
          FILTERS
          {!showFilter && <FaChevronRight className='text-[18px] md:hidden' />}
          {showFilter && <FaChevronDown className='text-[18px] md:hidden' />}
        </p>

        {/* Categories */}
        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa] '> CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex flex-col items-start justify-center gap-[10px]'>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} /> Men
            </p>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} /> Women
            </p>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* Sub Categories */}
        <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa] '>Sub-CATEGORIES</p>
          <div className='w-[230px] h-[120px] flex flex-col items-start justify-center gap-[10px]'>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'TopWear'} className='w-3' onChange={toggleSubCategory} /> Top Wear
            </p>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'BottomWear'} className='w-3' onChange={toggleSubCategory} /> Bottom Wear
            </p>
            <p className='flex items-center gap-[10px] text-[16px] font-light'>
              <input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory} /> Winter Wear
            </p>
          </div>
        </div>
      </div>

      {/* Main content wrapper: add padding left on lg to avoid overlap with fixed sidebar */}
      <div className='flex-1 lg:pl-[20vw] md:pl-[30vw]'>

        {/* Header + Sorting */}
        <div className='w-full p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select name="" id="" className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg border-[2px] hover:border-[#46d1f7]'>
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        <div className='w-full min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className="text-white">No products found</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Collections
