import { Link } from "react-router-dom";

interface LoginFormProps {
  checkLogin: any;
}

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import { createTheme } from "@mui/material/styles";
import { Formik } from "formik";
import MyfetchMiddleWare from "../utils/api";
import * as Yup from "yup";
import "./loginform.css";
import { useState } from "react";
import Loader from "../utils/Loader";

const registrationValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// const defaultTheme = createTheme();
// interface LoginFormProps {
//   checkLogin: any;
// }
const LoginForm: React.FC<LoginFormProps> = ({ checkLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: any, actions: any) => {
    setIsLogin(true)
    try {
      if (values) {
        const userData = {
          method: "POST",
          endPoint: "api/users/login",
          options: { data: {...values} },
        };
        const response = await MyfetchMiddleWare(userData);
        console.log(response, "response");
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.tokens);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("id", response.data.data.id);
          console.log("Token set");
          actions.resetForm();
          checkLogin();
          navigate("/");
          setIsLogin(false)
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
    <div className="loginPage">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={registrationValidationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <>
            <div className="background">
              <div className="shape"></div>
              <div className="shape"></div>
            </div>
            <form noValidate onSubmit={handleSubmit}>
              <h3>Login Here</h3>
              <label style={{ visibility: "hidden" }} htmlFor="name">
                Email Address
              </label>
              <input
                required
                id="name"
                name="name"
                autoComplete="name"
                style={{ visibility: "hidden" }}
              />
              <div className=" errors" style={{ visibility: "hidden" }}>
                {/* {errors. && touched.name ? (
                <span className="text-red-500">{errors.name}</span>
              ): null} */}
              </div>
              <label htmlFor="email">Email Address</label>
              <input
                required
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLogin?true:false}

              />
              <div className=" errors">
                {errors.email && touched.email ? (
                  <span className="text-red-500">{errors.email}</span>
                ) : null}
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
                disabled={isLogin?true:false}
              />
              <div className=" errors">
                {errors.password && touched.password ? (
                  <span className="text-red-500">{errors.password}</span>
                ) : null}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                
                {isLogin?<Loader />:"Login"}
              </Button>
              <Grid container>
                <Grid item>
                  <div className="social">
                    <span className="formtext">Create new account</span>
                    <Link to="/register">
                      <div className="fb">
                        <i className="fab fa-facebook"></i>Register
                      </div>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
