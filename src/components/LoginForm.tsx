import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginValidationSchema} from "../utils/validationSchema";
import MyfetchMiddleWare, { RequestOptions } from "../utils/api";
import { ValuesType } from "./RegisterForm";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {

  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password:""

 
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register Form </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async (values: ValuesType, actions) => {
          console.log('Hello')
          try {
            if (values) {
              const userData: RequestOptions = {
                method: "POST",
                endPoint: "api/users/login",
                options: { ...values },
              };
              console.log(userData)
              const response = await MyfetchMiddleWare(userData);
              // console.log("Success: ", response)
              localStorage.setItem('token', response.data.data.tokens)
              localStorage.setItem('id', response.data.data.id)
              alert("login Successful");
              actions.resetForm();
              navigate('/')
            } else {
              console.log(Error);
            }
            alert(JSON.stringify(values, undefined, 2));
          } catch (error: any) {
            console.log("ERROR IN SUBMIT ", error);
            alert(error.message);
          }
        }}
      >
        {() => (
          <Form>
            {/* <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div> */}
            <div className="flex justify-between">
              <button
                type="submit"
                className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              {/* <span>
                Already a user? <Link to="/login">Login</Link>
              </span> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
