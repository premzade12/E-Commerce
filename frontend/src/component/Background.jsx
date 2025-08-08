import React from "react";
import back1 from "../assets/back_1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.jpeg";
import back4 from "../assets/back4.jpeg";

function Background({ heroCount, className }) {
  let src;
  if (heroCount === 0) src = back1;
  else if (heroCount === 1) src = back2;
  else if (heroCount === 2) src = back3;
  else if (heroCount === 3) src = back4;

  return (
    <img
      src={src}
      alt=""
      className={`${className} w-full sm:w-1/2 h-screen object-fill`} // fixed width & height auto
    />
  );
}

export default Background;
