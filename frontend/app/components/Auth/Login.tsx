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
  email: Yup.string()
    .email("invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = (props: Props) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (email, password) => {
      console.log(email, password);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Log In</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md"
      >
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
            className={`w-full px-3 py-2 border dark:bg-white dark:text-black ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleChange}
            placeholder="Enter your email.."
            value={values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-1">
              {errors.email}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`w-full px-3 py-2 border dark:bg-white dark:text-black ${
              formik.errors.password && formik.touched.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleChange}
            placeholder="Enter your password..."
            value={formik.values.password}
          />
          {errors.password && touched.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
