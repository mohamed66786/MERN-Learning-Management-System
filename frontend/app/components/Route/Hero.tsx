import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};
const Hero: FC<Props> = (props) => {
  return <div className="w-full 1000px:flex">
    <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 
    1100px:h-[600px] 1100px:w-[600px]   ">
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image src="" alt="this is the main image" className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] "/>
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center
      1000px:text-left mt-[150px] "> 
      <h2>
        
      </h2>
      </div>
    </div>
  </div>;
};

export default Hero;
