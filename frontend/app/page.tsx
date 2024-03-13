"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
interface Props {}

const page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="Elearning"
        description="The best sit for learning"
        keywords="programing,MERN,Algorithms,Math,Software"
      />
      <Header />
    </div>
  );
};
export default page;
