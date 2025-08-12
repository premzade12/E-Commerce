import React, { useState, useEffect } from 'react';
import Background from '../component/Background.jsx';
import Hero from '../component/Hero.jsx';
import Product from './Product.jsx';
import NewLetterBox from '../component/NewLetterBox.jsx';
import OurPolicy from '../component/OurPolicy.jsx';

const Home = () => {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collections", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative">
      {/* Hero Section */}
      {/* flex-col-reverse on mobile to swap order, flex-row from sm up */}
      <div className="relative sm:min-py-40 w-screen h-[60vh] sm:h-[50vh] md:h-[70vh] lg:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col-reverse sm:flex-row">
        
        {/* Desktop and medium devices */}
        <div className="hidden sm:flex md:flex lg:flex py-40 flex-1 items-center justify-center p-4">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
            className="text-center sm:text-left"
          />
        </div>

        {/* Small devices */}
        <div className="absolute z-1 left-[20%] gap-[20px] mx-auto flex sm:hidden flex-1 items-center justify-center p-4">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
            className="text-center "
          />
        </div>


        {/* Background Image */}
        {/* Medium and large screens */}
        <div className="hidden sm:flex md:flex lg:flex relative flex-1">
          <Background
            heroCount={heroCount}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small screens */}
        <div className="z-0 flex sm:hidden relative flex-1 ">
          <Background
            heroCount={heroCount}
            className="w-full h-full object-fill"
          />
        </div>

      </div>

      {/* Product Section */}
      <Product />
      <OurPolicy/>
      <NewLetterBox/>
    </div>
  );
};

export default Home;
