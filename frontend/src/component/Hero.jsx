import React from 'react';
import { FaCircle } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full h-full relative flex flex-col items-center sm:items-start justify-center">
      {/* Hero text */}
      <div className="mb-4 sm:mb-0 text-black font-bold sm:text-[#88d9ee] sm:font-normal text-[20px] sm:text-2xl md:text-[40px] lg:text-[55px] text-center sm:text-left">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center sm:justify-start gap-[10px] text-orange-400">
        {[0, 1, 2, 3].map((index) => (
          <FaCircle
            key={index}
            className={`w-[14px] cursor-pointer ${
              heroCount === index ? "fill-orange-400" : "fill-white"
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
