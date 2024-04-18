import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {loginValidationSchema} from "../utils/validationSchema";
import MyfetchMiddleWare, { RequestOptions } from "../utils/api";
import { ValuesType } from "./RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface LoginFormProps{
  checkLogin: any;
}

const LoginForm: React.FC<LoginFormProps> = ({checkLogin}) => {
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password:""
  };

  const handleSubmit = async (values: ValuesType, actions: { resetForm: () => void; }) => {
    try {
      if (values) {
        const userData = {
          method: "POST",
          endPoint: "api/users/login",
          options: { ...values },
        };
        const response = await MyfetchMiddleWare(userData);
        actions.resetForm();
           if(response.status == 200){
            localStorage.setItem('token', response.data.data.tokens);
            localStorage.setItem('id', response.data.data.id);
            Swal.fire({
              position: "center",
              icon: "success",
              title:response.data.message,
              showConfirmButton: false,
              timer: 2500
            });
            checkLogin();
           } else{
              Swal.fire({
              position: "center",
              icon: "error",
              title:response.data.message,
              showConfirmButton: false,
              timer: 2500
            });
           }
      
      } else {
        console.log(Error);
      }
    } catch (error:any) {

      Swal.fire({
        position: "center",
        icon: "error",
        title:error,
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  

  return (
    // <div className="max-w-md mx-auto">
    //   <h2 className="text-2xl font-semibold mb-4">Register Form </h2>
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={loginValidationSchema}
    //     onSubmit={async (values: ValuesType, actions) => {
    //       console.log('Hello')
    //       try {
    //         if (values) {
    //           const userData: RequestOptions = {
    //             method: "POST",
    //             endPoint: "api/users/login",
    //             options: { ...values },
    //           };
    //           console.log(userData)
    //           const response = await MyfetchMiddleWare(userData);
    //           // console.log("Success: ", response)
    //           localStorage.setItem('token', response.data.data.tokens)
    //           localStorage.setItem('id', response.data.data.id)
    //           alert("login Successful");
    //           actions.resetForm();
    //           checkLogin()
    //           navigate('/')
    //         } else {
    //           console.log(Error);
    //         }
    //         alert(JSON.stringify(values, undefined, 2));
    //       } catch (error: any) {
    //         console.log("ERROR IN SUBMIT ", error);
    //         alert(error.message);
    //       }
    //     }}
    //   >
    //     {() => (
    //       <Form>

    //         <div className="mb-4">
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email
    //           </label>
    //           <Field
    //             type="email"
    //             id="email"
    //             name="email"
    //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
    //           />
    //           <ErrorMessage
    //             name="email"
    //             component="div"
    //             className="text-red-500 text-sm"
    //           />
    //         </div>
    //         <div className="mb-4">
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <Field
    //             type="password"
    //             id="password"
    //             name="password"
    //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
    //           />
    //           <ErrorMessage
    //             name="password"
    //             component="div"
    //             className="text-red-500 text-sm"
    //           />
    //         </div>
    //         {/* <div className="mb-4">
    //           <label
    //             htmlFor="confirmPassword"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Confirm Password
    //           </label>
    //           <Field
    //             type="password"
    //             id="confirmPassword"
    //             name="confirmPassword"
    //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
    //           />
    //           <ErrorMessage
    //             name="confirmPassword"
    //             component="div"
    //             className="text-red-500 text-sm"
    //           />
    //         </div> */}
    //         <div className="flex justify-between">
    //           <button
    //             type="submit"
    //             className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    //           >
    //             Login
    //           </button>
    //           {/* <span>
    //             Already a user? <Link to="/login">Login</Link>
    //           </span> */}
    //         </div>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>




  <div className="flex justify-center items-center h-screen">
  <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
    <h2 className="text-2xl font-semibold mb-4 text-center">Login Form</h2>
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <span>
              New user? <Link to="/" className="text-blue-500">Register</Link>
            </span>
          </div>
        </form>
      )}
    </Formik>
  </div>
</div>

  );
};

export default LoginForm;
