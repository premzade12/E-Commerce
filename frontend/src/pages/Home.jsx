import React, { useState, useEffect } from 'react';
import Background from '../component/Background.jsx';
import Hero from '../component/Hero.jsx';
import Product from './Product.jsx';

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
      <div className="relative w-screen h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex justify-baseline sm:flex-row">
        
        {/* Hero content */}
        <div className="lg:w-full md:w-full h-[100vh] sm:w-1/2 flex items-center justify-between ">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
            className="text-center sm:text-left"
          />

          {/* Background image with full viewport height */}
          <Background
            heroCount={heroCount}
            className="lg:w-[40%] md:w-1/2 sm:w-1/2 h-[100vh] object-cover"
          />
        </div>
      </div>
      <Product/>
    </div>
    
  );
};

export default Home;
