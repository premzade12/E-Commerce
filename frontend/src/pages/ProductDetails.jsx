import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import RelatedProduct from "../component/RelatedProduct";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";

function ProductDetails() {
  let { productId } = useParams();
  let { products, currency } = useContext(shopDataContext);

  const [productData, setProductData] = useState(false);
  const [image, setimage] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [image4, setimage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setimage1(found.image1);
      setimage2(found.image2);
      setimage3(found.image3);
      setimage4(found.image4);
      setimage(found.image1);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      {/* Main product section */}
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 px-4 py-8">
        
        {/* Thumbnails + Main Image */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-4 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col flex-wrap justify-center gap-4 lg:gap-2 w-full lg:w-1/5">
            {[image1, image2, image3, image4].filter(Boolean).map((src, i) => (
              <div
                key={i}
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setimage(src)}
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-4/5 border border-[#80808049] rounded-md overflow-hidden max-h-[500px]">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover bg-black"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 text-white px-2">
          <h1 className="text-2xl md:text-4xl font-semibold">
            {productData?.name?.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStarHalfAlt className="text-[20px] fill-[#FFD700]" />
            <p className="text-sm md:text-lg font-semibold pl-1">(124)</p>
          </div>

          {/* Price */}
          <p className="text-xl md:text-3xl font-semibold">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="w-full sm:w-[80%] md:w-[60%] text-sm md:text-lg">
            {productData.description} and stylish, breathable cotton shirt with
            a modern slim fit. Easy to wash, super comfortable, and designed for
            effortless style.
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 my-4">
            <p className="text-lg md:text-2xl font-semibold">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md transition ${
                    item === size
                      ? "bg-black text-[#2f97f1] text-lg"
                      : "bg-slate-300 text-black"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="text-sm md:text-base active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-2 px-5 rounded-2xl border border-[#80808049] text-white shadow-md shadow-black">
              Add To Cart
            </button>
          </div>

          <div className="w-[90%] h-[1px] bg-slate-700"></div>

          {/* Extra Info */}
          <div className="text-sm md:text-base">
            <p>100% Original Products.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Related */}
      <div className="w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col">
        {/* Tabs */}
        <div className="flex px-4 mt-6 lg:ml-[80px] lg:mt-0">
          <p className="border px-5 py-3 text-sm text-white">Description</p>
          <p className="border px-5 py-3 text-sm text-white">Reviews (124)</p>
        </div>

        {/* Long Description */}
        <div className="w-[90%] md:w-[80%] bg-[#3336397c] border text-white text-xs md:text-sm lg:text-lg px-3 md:px-6 lg:ml-[100px] ml-[20px] mt-4 py-4">
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt,
            available now on OneCart. Crafted from breathable, high-quality
            fabric, it offers all-day comfort and effortless style. Easy to
            maintain and perfect for any setting, this shirt is a must-have
            essential for those who value both fashion and function.
          </p>
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetails;
