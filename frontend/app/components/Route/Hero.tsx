// import Image from "next/image";
// import Link from "next/link";
// import React, { FC } from "react";
// import { BiSearch } from "react-icons/bi";

// type Props = {};
// const Hero: FC<Props> = (props) => {
//   return (
//     <div className="w-full 1000px:flex">
//       <div
//         className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px]
//               1100px:h-[600px] 1100px:w-[600px]  hero_animation rounded-full pr-20  "
//       >
//         <div className="1000px:w-[110%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
//           <Image
//             src={require("../../../public/banner-img-1.png")}
//             alt="this is the E-LERNING image"
//             className=" object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] "
//           />
//         </div>
//         <div
//           className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center
//       1000px:text-left mt-[150px] "
//         >
//           <h2 className="dark:text-white text-black text-[30px] w-full px-3 1000px:text-[70px] font-[600] font-Josefina py-2 1000px:leading-[75px]   ">
//             Improve Your Online Learning Experience Better Instantly
//           </h2>
//           <br />
//           <p className="■dark: text-[#edfff4] □text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
//             We have 40k+ Online courses & 500K+ Online registered student. Find
//             your desired Courses from them.
//           </p>
//           <br />
//           <br />
//           <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
//             <input
//               type="search"
//               placeholder="Search Courses..."
//               className="bg-transparent border dark: border-none dark:bg-[#575757) dark: placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-black dark:text-white"
//             />
//             <div className="absolute_flex_items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 ■bg-[#39c1f3] rounded-r-[5px]">
//               <BiSearch className=" text-white" size={30} />
//             </div>
//           </div>
//           <br />
//           <br />
//           {/* <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
//             <Image
//               src={require("../../../public/assests/client-1.jpg")}
//               alt=""
//               className="rounded-full "
//             />
//             <Image
//               src={require("../../../public/assests/client-2.jpg")}
//               alt=""
//               className="rounded-full ml-[-20px]"
//             />
//             <Image
//               src={require("../../../public/assests/client-3.jpg")}
//               alt=""
//               className="rounded-full ml-[-20px]"
//             />
//             <p className="font-Josefina dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
//               500K+ People already trusted us.{" "}
//               <Link
//                 href="/courses"
//                 className="dark:text-[#46e256] text-[crimson]"
//               >
//                 View Courses
//               </Link>{" "}
//             </p>
//           </div>
//           <br /> */}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Hero;

import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};
const Hero: FC<Props> = (props) => {
  return (
    <div className="mt-40 w-full flex flex-col 1000px:flex-row items-center justify-between gap-10 px-5">
      {/* Left Content - Image */}
      <div className="1000px:w-[50%] flex items-center justify-center hero_animation rounded-full p-10">
        <Image
          src={require("../../../public/banner-img-1.png")}
          alt="E-LEARNING image"
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10]"
        />
      </div>

      {/* Right Content - Text */}
      <div className="1000px:w-[50%] flex flex-col items-center text-center 1000px:text-left">
        <h2 className="dark:text-white text-black text-[30px] w-full px-3 1000px:text-[70px] font-[600] font-Josefina py-2 1000px:leading-[75px]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] mt-4">
          We have 40k+ Online courses & 500K+ Online registered students. Find
          your desired Courses from them.
        </p>
        <div className="mt-6 w-full 1000px:w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-black dark:text-white"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={require("../../../public/client-2.jpg")}
            alt=""
             className="rounded-full ml-[-100px] h-[50px] w-[50px]"
          />
          <Image
            src={require("../../../public/client-3.jpg")}
            alt=""
        className="rounded-full ml-[-100px] h-[50px] w-[50px]"
          />
          <Image
            src={require("../../../public/client-1.jpg")}
            alt=""

            className="rounded-full ml-[-100px] h-[50px] w-[50px]"          />
          <p className="font-Josefina dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600] ml-36">
            500K+ People already trusted us.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses{" "}
            </Link>{" "}
          </p>
        </div>{" "}
        <br />
      </div>
    </div>
  );
};

export default Hero;
