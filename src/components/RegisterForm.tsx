// import React from "react";
// import { Formik, Field, ErrorMessage } from "formik";
// import { registrationValidationSchema } from "../utils/validationSchema";
// import MyfetchMiddleWare from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// export interface ValuesType {
//   name?: String;
//   email: String;
//   password: String;
//   confirmPassword?: String;
// }
// const RegisterForm: React.FC = () => {

//   const navigate = useNavigate();

//   const handleRegister = async (
//     values: any,
//     actions: { resetForm: () => void }
//   ) => {
//     try {
//       if (values) {
//         const userData = {
//           method: "POST",
//           endPoint: "api/users",
//           options: { ...values },
//         };
//         const response = await MyfetchMiddleWare(userData);
//         if (response.status == 201) {
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: response.data.message,
//             showConfirmButton: false,
//             timer: 2500,
//           });
//           navigate("/");
//           actions.resetForm();
//         }
//       } else {
//         console.log(Error);
//       }
//     } catch (error: any) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: error,
//         showConfirmButton: false,
//         timer: 2500,
//       });
//     }
//   };

//   return (
//     // <div className="max-w-md mx-auto">
//     //   <h2 className="text-2xl font-semibold mb-4">Register Form </h2>
//     //   <Formik
//     //     initialValues={initialValues}
//     //     validationSchema={registrationValidationSchema}
//     //     onSubmit={async (values: ValuesType, actions) => {
//     //       try {
//     //         if (values) {
//     //           const userData: RequestOptions = {
//     //             method: "POST",
//     //             endPoint: "api/users",
//     //             options: { ...values },
//     //           };
//     //           await MyfetchMiddleWare(userData);
//     //           alert("Registration Successful");
//     //           navigate("/Login");
//     //           actions.resetForm();

//     //         } else {
//     //           console.log(Error);
//     //         }
//     //         // alert(JSON.stringify(values, undefined, 2));
//     //       } catch (error: any) {
//     //         // console.log("ERROR IN SUBMIT ", error);
//     //         alert(error.message);
//     //       }
//     //     }}
//     //   >
//     //     {() => (
//     //       <Form>
//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor="name"
//     //             className="block text-sm font-medium text-gray-700"
//     //           >
//     //             Name
//     //           </label>
//     //           <Field
//     //             type="text"
//     //             id="name"
//     //             name="name"
//     //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
//     //           />
//     //           <ErrorMessage
//     //             name="name"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor="email"
//     //             className="block text-sm font-medium text-gray-700"
//     //           >
//     //             Email
//     //           </label>
//     //           <Field
//     //             type="email"
//     //             id="email"
//     //             name="email"
//     //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
//     //           />
//     //           <ErrorMessage
//     //             name="email"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor="password"
//     //             className="block text-sm font-medium text-gray-700"
//     //           >
//     //             Password
//     //           </label>
//     //           <Field
//     //             type="password"
//     //             id="password"
//     //             name="password"
//     //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
//     //           />
//     //           <ErrorMessage
//     //             name="password"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div className="mb-4">
//     //           <label
//     //             htmlFor="confirmPassword"
//     //             className="block text-sm font-medium text-gray-700"
//     //           >
//     //             Confirm Password
//     //           </label>
//     //           <Field
//     //             type="password"
//     //             id="confirmPassword"
//     //             name="confirmPassword"
//     //             className="mt-1 p-2 block w-full border-gray-300 rounded-md"
//     //           />
//     //           <ErrorMessage
//     //             name="confirmPassword"
//     //             component="div"
//     //             className="text-red-500 text-sm"
//     //           />
//     //         </div>
//     //         <div className="flex justify-between">
//     //           <button
//     //             type="submit"
//     //             className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//     //           >
//     //             Register
//     //           </button>
//     //           <span>
//     //             Already a user? <Link to="/login">Login</Link>
//     //           </span>
//     //         </div>
//     //       </Form>
//     //     )}
//     //   </Formik>
//     // </div>

//     <div className="flex justify-center items-center h-screen">
//       <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl font-semibold mb-4 text-center">
//           Register Form
//         </h2>
//         <Formik
//           initialValues={{
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//           }}
//           validationSchema={registrationValidationSchema}
//           onSubmit={handleRegister}
//         >
//           {({ handleSubmit }) => (
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <Field
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <Field
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className="mt-1 p-2 block w-full border border-black border-opacity-10 rounded-md"
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>
//           )}
//         </Formik>
//         <span>
//           Already a user?{" "}
//           <Link to="/" className="text-blue-500">
//             Login
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { ErrorMessage, Formik } from "formik";
// import Swal from "sweetalert2";
// import MyfetchMiddleWare from "../utils/api";
// import { registrationValidationSchema } from "../utils/validationSchema";

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
// export interface ValuesType {
//   name?: String;
//   email: String;
//   password: String;
//   confirmPassword?: String;
// }

// export default function RegisterForm() {
//   // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   const data = new FormData(event.currentTarget);
//   //   console.log({
//   //     email: data.get('email'),
//   //     password: data.get('password'),
//   //   });
//   // };

//   const navigate = useNavigate();

//   const handleRegister = async (
//     values: any,
//     actions: { resetForm: () => void }
//   ) => {
//     try {
//       if (values) {
//         const userData = {
//           method: "POST",
//           endPoint: "api/users",
//           options: { ...values },
//         };
//         const response = await MyfetchMiddleWare(userData);
//         if (response.status == 201) {
//           Swal.fire({
//             position: "center",
//             icon: "success",
//             title: response.data.message,
//             showConfirmButton: false,
//             timer: 2500,
//           });
//           navigate("/");
//           actions.resetForm();
//         }
//       } else {
//         console.log(Error);
//       }
//     } catch (error: any) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: error,
//         showConfirmButton: false,
//         timer: 2500,
//       });
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       }}
//       validationSchema={registrationValidationSchema}
//       onSubmit={handleRegister}
//     >
//       {({ errors, touched, handleSubmit }) => (
//         <ThemeProvider theme={defaultTheme}>
//           <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//               sx={{
//                 marginTop: 8,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                 <LockOutlinedIcon />
//               </Avatar>
//               <Typography component="h1" variant="h5">
//                 Sign up
//               </Typography>
//               <Box
//                 component="form"
//                 noValidate
//                 onSubmit={handleSubmit}
//                 sx={{ mt: 3 }}
//               >
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={12}>
//                     <TextField
//                       autoComplete="given-name"
//                       name="name"
//                       required
//                       fullWidth
//                       id="name"
//                       label="Name"
//                       autoFocus
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <ErrorMessage
//                       name="name"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="email"
//                       label="Email Address"
//                       name="email"
//                       autoComplete="email"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type="password"
//                       id="password"
//                       autoComplete="new-password"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="confirmPassword"
//                       label="Confirm Password"
//                       type="confirmPassword"
//                       id="confirmPassword"
//                       autoComplete="new-confirmPassword"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={12}>
//                     <ErrorMessage
//                       name="confirmPassword"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </Grid>
//                 </Grid>
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Sign Up
//                 </Button>
//                 <Grid container justifyContent="flex-end">
//                   <Grid item>
//                     <span>
//                       Already a user?{" "}
//                       <Link to={"/"} className="text-blue-500">
//                         Login
//                       </Link>
//                     </span>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Container>
//         </ThemeProvider>
//       )}
//     </Formik>
//   );
// }

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import { createTheme } from "@mui/material/styles";
import { Formik } from "formik";
import MyfetchMiddleWare from "../utils/api";
// import { registrationValidationSchema } from "../utils/validationSchema";
import * as Yup from "yup"; // Import Yup
import './registrationform.css'
import { useState } from "react";
import Loader from "../utils/LoginLoader";

const registrationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

// const defaultTheme = createTheme();

export default function RegisterForm() {
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (
    values: any,
    actions: { resetForm: () => void }
  ) => {
    setIsRegister(true)

    try {
      if (values) {

        const userData = {
          method: "POST",
          endPoint: "api/users",
          options: { data: {...values} },
        };
        const response = await MyfetchMiddleWare(userData);
        
        if (response.status == 201) {
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: response.data.message,
          //   showConfirmButton: false,
          //   timer: 2500,
          // });
          navigate("/");
          actions.resetForm();
          setIsRegister(false)

        }
      } else {
        console.log(Error);
      }
    } catch (error: any) {
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: error,
      //   showConfirmButton: false,
      //   timer: 2500,
      // });
    }
  };

  return (
    // <Formik
    //   initialValues={{
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   }}
    //   validationSchema={registrationValidationSchema}
    //   onSubmit={handleRegister}
    // >
    //   {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
    //     <ThemeProvider theme={defaultTheme}>
    //       <Container component="main" maxWidth="xs">
    //         <CssBaseline />
    //         <Box
    //           sx={{
    //             marginTop: 8,
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //             <LockOutlinedIcon />
    //           </Avatar>
    //           <Typography component="h1" variant="h5">
    //             Sign up
    //           </Typography>
    //           <Box
    //             component="form"
    //             noValidate
    //             onSubmit={handleSubmit}
    //             sx={{ mt: 3 }}
    //           >
    //             <Grid container spacing={2}>
    //               <Grid item xs={12} sm={12}>
    //                 <TextField
    //                   autoComplete="given-name"
    //                   name="name"
    //                   required
    //                   fullWidth
    //                   id="name"
    //                   label="Name"
    //                   autoFocus
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                 />
    //                 {errors.name && touched.name && (
    //                   <div className="text-red-500 text-sm">{errors.name}</div>
    //                 )}
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   id="email"
    //                   label="Email Address"
    //                   name="email"
    //                   autoComplete="email"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                 />
    //                 {errors.email && touched.email && (
    //                   <div className="text-red-500 text-sm">{errors.email}</div>
    //                 )}
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   name="password"
    //                   label="Password"
    //                   type="password"
    //                   id="password"
    //                   autoComplete="new-password"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                 />
    //                 {errors.password && touched.password && (
    //                   <div className="text-red-500 text-sm">{errors.password}</div>
    //                 )}
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   name="confirmPassword"
    //                   label="Confirm Password"
    //                   type="password"
    //                   id="confirmPassword"
    //                   autoComplete="new-password"
    //                   onChange={handleChange}
    //                   onBlur={handleBlur}
    //                 />
    //                 {errors.confirmPassword && touched.confirmPassword && (
    //                   <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
    //                 )}
    //               </Grid>
    //             </Grid>
    //             <Button
    //               type="submit"
    //               fullWidth
    //               variant="contained"
    //               sx={{ mt: 3, mb: 2 }}
    //             >
    //               Sign Up
    //             </Button>
    //             <Grid container justifyContent="flex-end">
    //               <Grid item>
    //                 <span>
    //                   Already a user?{" "}
    //                   <Link to={"/"} className="text-blue-500">
    //                     Login
    //                   </Link>
    //                 </span>
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </Box>
    //       </Container>
    //     </ThemeProvider>
    //   )}
    // </Formik>
    <div className="registrationPage">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registrationValidationSchema}
        onSubmit={handleRegister}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <>
            <div className="background">
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <h3>Create Account</h3>
              <label htmlFor="name">Name</label>
              <input
                required
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isRegister?true:false}
              />
              <div className=" errors">
                {errors.name && touched.name ? (<span className="text-red-500">{errors.name}</span>):null}
              </div>
              <label htmlFor="email">Email Address</label>
              <input
                required
                id="email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isRegister?true:false}
              />
              <div className=" errors">
                {errors.email && touched.email ?(<span className="text-red-500">{errors.email}</span>): null}
              </div>
              <label htmlFor="password">Password</label>
              <input
                required
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isRegister?true:false}
              />
              <div className=" errors">
                {errors.password && touched.password ? (
                  <span className="text-red-500">{errors.password}</span>
                ) : null}
              </div>
              <label htmlFor="confirmPassword">confirmPassword</label>
              <input
                required
                name="confirmPassword"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="confirm-password"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isRegister?true:false}
              />
              <div className=" errors">
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span className="text-red-500">{errors.confirmPassword}</span>
                ) : null}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isRegister?<Loader />:"Sign Up"}
              </Button>
              {/* <Grid container sx={{margin:'30px', justifyContent: 'flex-start'}}> */}
                <Grid item>
                  <div className="social">
                    <span className="formtext">Already have an account?</span>
                    <Link to="/">
                      <div className="fb">
                        <i className="fab fa-facebook"></i>Login
                      </div>
                    </Link>
                  </div>
                </Grid>
              {/* </Grid> */}
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}


