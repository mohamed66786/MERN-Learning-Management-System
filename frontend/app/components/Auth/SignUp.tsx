"use clint";
import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name! "),
  email: Yup.string()
    .email("invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (email, password) => {
      setRoute("Verification");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`w-full px-3 py-2 border dark:bg-white text-black ${
              errors.name && touched.name
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleChange}
            placeholder="Please Ente your full Name..."
            value={values.name}
          />
          {errors.name && touched.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`w-full px-3 py-2 border dark:bg-white text-black ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleChange}
            placeholder="example@email.com"
            value={values.email}
          />
          {errors.email && touched.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        {/* Password Field */}
        <div className="w-full relative mb-6 ">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
          >
            Password:
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            className={`w-full px-3 py-2 border dark:bg-white text-black ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleChange}
            placeholder="Enter your password..."
            value={values.password}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-slate-900"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-slate-900"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white ">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2 dark:text-white text-black"
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer "
            onClick={() => setRoute("login")}
          >
            Log In
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
