import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

function LatestCollection() {
  let { products } = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
    }
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-full text-center md:mt-[50px]">
        <Title text1={"Latest"} text2={"COLLECTIONS"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>

      <div className="w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {latestProducts.length === 0 ? (
  <p className="text-white text-center">No products available</p>
) : (
  latestProducts.map((item) => (
    <Card
      key={item._id}
      name={item.name}
      image={item.image1}
      id={item._id}
      price={item.price}
    />
  ))
)}
      </div>
    </div>
  );
}

export default LatestCollection;
