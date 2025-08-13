import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function BastSeller() {
  let { products } = useContext(shopDataContext);
  let [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div>
      <div className='h-[8%] w-full text-center md:mt-[50px]'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved, Discover Our All - Time Best Sellers.
        </p>
      </div>
      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {
          bestSeller.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          ))
        }
      </div>
    </div>
  )
}

export default BastSeller
