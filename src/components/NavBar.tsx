import {
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  styled,
  Divider,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import { stringAvatar } from "../utils/avatarUtils.";
import { useAppDispatch } from "../hooks";
import { logoutUser } from "../app/Slice/TicketSlice";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Logout } from "@mui/icons-material";
import UserProfileDialog from "./Profile";
const drawerWidth = 240;

interface NavBarProps {
  open: boolean;
  handleDrawerOpen: any;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar: React.FC<NavBarProps> = ({ open, handleDrawerOpen }) => {
  const dispatch = useAppDispatch();
  const name = localStorage.getItem("name");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openAccountMenu = Boolean(anchorEl);
    const [openProfile, setOpenProfile] = useState(false)


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    handleClose();
    window.location.reload();
  };

  const handleProfile = () => {
    setOpenProfile(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        open={open}
        position="fixed"
        style={{ background: "#2c3e50", border: "none", outline: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Ticket Dashboard
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar alt="User Avatar" {...stringAvatar(`${name}`)} />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openAccountMenu}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem> */}
            <MenuItem onClick={handleProfile}>
              <Avatar /> My Profile
            </MenuItem>
            <Divider />
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <UserProfileDialog handleClose={()=>setOpenProfile(false)} openProfile={openProfile} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;


