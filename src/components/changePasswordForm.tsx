import { Button, DialogContentText, TextField } from "@mui/material";
import React, { useState } from "react";
import { updatePass } from "../app/Slice/TicketSlice";
import { Formik } from "formik";
import { useAppDispatch } from "../hooks";
import { updatePasswordSchema } from "../utils/validationSchema";
import Loader from "../utils/LoginLoader";

interface ChangePasswordFormProps {
  setSuccessMessage: any;
  setShowChangePassword: any;
  successMessage: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  setSuccessMessage,
  setShowChangePassword,
  successMessage,
}) => {
  const dispatch = useAppDispatch();
  const [isSubmit, SetIsSubmit] = useState(false);

  // update password handler

  const handleSubmitChange = async (values: any) => {
    setSuccessMessage("");
    SetIsSubmit(true);
    const { oldPassword, newPassword } = values.target;
    const currentPassword = oldPassword.value;
    const updatedPass = newPassword.value;
    if (currentPassword && updatedPass) {
      const response = await dispatch(
        updatePass({ currentPassword, updatedPass })
      );
      // console.log(response);
      if (response.meta.requestStatus == "fulfilled") {
        setShowChangePassword(false);
        setSuccessMessage("Password changed successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        SetIsSubmit(false);
        setSuccessMessage("Invalid Credentials");
      }
    } else {
      setSuccessMessage("Please fill all the fields");
    }
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={updatePasswordSchema}
      onSubmit={handleSubmitChange}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm,
      }) => (
        <form
          noValidate
          onSubmit={(e) => {
            handleSubmit(e);
            handleSubmitChange(e);
            resetForm();
          }}
        >
          <div className="flex justify-between" style={{ marginTop: "2rem" }}>
            <div className="flex flex-col" style={{ width: "50%" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "1.8rem",
                  color: "rgb(0,0,0,0.7)",
                }}
              >
                Change Password
              </h1>
              <div
                className="flex flex-col mt-8"
                style={{
                  flexWrap: "wrap",
                  width: "60%",
                  margin: "auto",
                  color: "rgb(0, 0, 0, 0.5)",
                }}
              >
                <span className="mb-2">Passwords must contain:</span>
                <span
                  style={
                    values.oldPassword.length &&
                    values.newPassword.length &&
                    values.confirmNewPassword.length >= 8
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  At least 8 characters
                </span>
                <span
                  style={
                    /^(?=.*[A-Z])/.test(values.oldPassword) &&
                    /^(?=.*[A-Z])/.test(values.newPassword) &&
                    /^(?=.*[A-Z])/.test(values.confirmNewPassword)
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  At least 1 upper case letter
                </span>
                <span
                  style={
                    /^(?=.*[a-z])/.test(values.oldPassword) &&
                    /^(?=.*[a-z])/.test(values.newPassword) &&
                    /^(?=.*[a-z])/.test(values.confirmNewPassword)
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  At least 1 lower case letter
                </span>
                <span
                  style={
                    /^(?=.*\d)/.test(values.oldPassword) &&
                    /^(?=.*\d)/.test(values.newPassword) &&
                    /^(?=.*\d)/.test(values.confirmNewPassword)
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                >
                  At least 1 number
                </span>
              </div>
            </div>

            <div className="updatepass" style={{ width: "50%" }}>
              {successMessage && (
                <DialogContentText
                  style={{ color: "red", margin: "1rem 0rem" }}
                >
                  {successMessage}
                </DialogContentText>
              )}
              <TextField
                size="small"
                error={errors.oldPassword && touched.oldPassword ? true : false}
                label="Old Password"
                type="password"
                name="oldPassword"
                onChange={handleChange}
                helperText={
                  errors.oldPassword && touched.oldPassword
                    ? errors.oldPassword
                    : null
                }
                onBlur={handleBlur}
                sx={{ marginBottom: "22px" }}
              />

              <TextField
                error={errors.newPassword && touched.newPassword ? true : false}
                size="small"
                label="New Password"
                type="password"
                name="newPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : null
                }
                sx={{ marginBottom: "22px" }}
              />

              <TextField
                error={
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? true
                    : false
                }
                size="small"
                label="Confirm Password"
                type="password"
                name="confirmNewPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? errors.confirmNewPassword
                    : null
                }
                sx={{ marginBottom: "22px" }}
              />
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "225px", marginBottom: "1rem" }}
                >
                  {isSubmit ? <Loader /> : "Submit"}
                </Button>
                <Button
                  onClick={() => {
                    setSuccessMessage("");
                    setShowChangePassword(false);
                  }}
                  sx={{ width: "225px" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
