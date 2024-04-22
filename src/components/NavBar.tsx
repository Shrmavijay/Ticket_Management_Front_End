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
        handleClose();
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

// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import MenuIcon from "@mui/icons-material/Menu";
// import Divider from "@mui/material/Divider";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { List, Drawer } from "@mui/material";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// const NavBar: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const name = localStorage.getItem("name");

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleLogout = () => {
//     // Handle logout logic
//     handleClose();
//   };

//   const handleProfile = () => {
//     // Handle profile logic
//     handleClose();
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDrawerOpen = () => {
//     setOpenDrawer(true);
//   };

//   const handleDrawerClose = () => {
//     setOpenDrawer(false);
//   };

//   return (
//     <>
//       <AppBar position="static" style={{ background: "#2c3e50" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, textAlign: "center" }}
//           >
//             Ticket Dashboard
//           </Typography>
//           <IconButton onClick={handleClick}>
//             <Avatar alt="User Avatar" {...stringAvatar(`${name}`)} />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <MenuItem onClick={handleProfile}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 20,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "#2c3e50",
//             color: "white",
//           },
//         }}
//         variant="temporary"
//         anchor="left"
//         open={openDrawer}
//         onClose={handleDrawerClose}
//       >
//         {/* <DrawerHeader> */}
//           {/* <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton> */}
//           {/* <ChevronLeftIcon onClick={handleDrawerClose} />
//           Borad
//         </DrawerHeader> */}
//         <DrawerHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}>
//   <ArrowBackIcon onClick={handleDrawerClose} />
//   <Typography variant="h6" noWrap>
//     Borads
//   </Typography>
// </DrawerHeader>

//         <Divider />
//         {/* <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <List> */}
//         <List>
//           {["Action borad (assignee)", "Basic borad ", "Kanban borad", "Kanban borad task","Work background structure" ].map((text, index) => (
//             <ListItem button key={text} sx={{ textAlign: "center" }}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         {/* <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List> */}
//       </Drawer>
//       <Main open={openDrawer}>
//         <DrawerHeader />
//       </Main>
//     </>
//   );
// };

// export default NavBar;
