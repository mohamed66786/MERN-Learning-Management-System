import React, { FC, useState } from "react";
interface HeadProps {
  title: string;
  description: string;
  keywords: string;
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="decription" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};
