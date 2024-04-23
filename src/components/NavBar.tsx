import { Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, styled } from '@mui/material'
import React, { useState } from 'react'
import { stringAvatar } from "../utils/avatarUtils.";
import { useAppDispatch } from '../hooks';
import { logoutUser } from '../app/Slice/TicketSlice';
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
const drawerWidth = 240;

interface NavBarProps{
  open: boolean;
  handleDrawerOpen: any
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

const NavBar:React.FC<NavBarProps>  = ({open, handleDrawerOpen}) => {
    const dispatch = useAppDispatch();
    const name = localStorage.getItem('name')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.clear()
        handleClose()
        window.location.reload();
      };

      const handleProfile = () => {
        handleClose();
      };

      const handleClose = () => {
        setAnchorEl(null);
      };
  return (
    <>
    <AppBar open={open} position="fixed" style={{ background: '#2c3e50', border:'none', outline:'none'}}>
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

          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Ticket Dashboard
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar alt="User Avatar" {...stringAvatar(`${name}`)} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            // getContentAnchorEl={null}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      </>
  )
}

export default NavBar



