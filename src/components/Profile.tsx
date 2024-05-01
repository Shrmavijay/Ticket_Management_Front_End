import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import "./Profile.css";
import { stringAvatar } from "../utils/avatarUtils.";
import "./loginform.css";
import ChangePasswordForm from "./changePasswordForm";
interface UserProfileDialogProps {
  handleClose: any;
  openProfile: boolean;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  handleClose,
  openProfile,
}) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = () => {
    setShowChangePassword(true);
  };

  return (
    <div>
      <Dialog
        open={openProfile}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: "800px",
            width: "750px",
          },
        }}
      >
        <DialogTitle
          sx={{
            outline: "1px solid rgb(0, 0, 0, 0.1)",
            background: "linear-gradient(to bottom, #161f28, transparent 735%)",
            color: "#64787f",
            boxShadow: "0 30px 30px -25px rgba(65, 51, 183, 0.25)",
          }}
        >
          My Profile
        </DialogTitle>
        {!showChangePassword ? (
          <DialogContent>
            <div
              style={{
                display: "flex",
                columnGap: "50px",
                marginBottom: "1rem",
                marginTop: "2rem",
              }}
            >
              <Avatar
                alt="User Avatar"
                {...stringAvatar(`vijay`)}
                sx={{ width: "150px", height: "150px", fontSize: "5rem" }}
              />
              <div style={{ marginLeft: "1rem" }}>
                <DialogContentText>Name: John Doe</DialogContentText>
                <DialogContentText>
                  Email: johndoe@example.com
                </DialogContentText>

                <Button
                  sx={{ padding: "6px 0px" }}
                  onClick={handlePasswordChange}
                >
                  Change Password
                </Button>

                {successMessage && (
                  <DialogContentText
                    style={{ color: "green", marginTop: "1rem" }}
                  >
                    {successMessage}
                  </DialogContentText>
                )}
              </div>
            </div>
          </DialogContent>
        ) : (
          <DialogContent>
            <ChangePasswordForm
              setSuccessMessage={setSuccessMessage}
              setShowChangePassword={setShowChangePassword}
              successMessage={successMessage}
            />
          </DialogContent>
        )}
        <DialogActions>
          { !showChangePassword ?<Button onClick={handleClose}>Close</Button>: null}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfileDialog;
