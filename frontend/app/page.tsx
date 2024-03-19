"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="Elearning"
        description="The best sit for learning"
        keywords="programing,MERN,Algorithms,Math,Software"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};
export default Page;
