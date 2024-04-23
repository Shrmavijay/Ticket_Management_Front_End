import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NavBar from "./NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TicketsPage from "../pages/TicketsPage";
import { useState } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));




const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideDrawer() {
  const [open, setOpen] = useState(true);

  const [ticketWidth, setTicketWidth] = useState(268)

  const [sectionName, setSectionName] = useState("Basic board")

  const handleDrawerOpen = () => {
    setOpen(true);
    setTicketWidth(268)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTicketWidth(326)
  };

  const getName = (text: string)=>setSectionName(text)

  return (
  <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar  open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
            color: "white",
            border:"none",
            outline: "none"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader> */}

        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <ArrowBackIcon onClick={handleDrawerClose} sx={{cursor:'pointer'}} />
          <span className="mx-10">Board</span>
        </DrawerHeader>

        <Divider />
        {/* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

        <List>
          {[
            "Action board (assignee)",
            "Basic board ",
            "Kanban board",
            "Kanban board task",
            "Work background structure",
          ].map((text) => (
            <ListItem button key={text} onClick={()=>getName(text)} sx={{ textAlign: "left" }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />
      </Drawer>
      <Main open={open} sx={{marginTop:'3rem'}}><TicketsPage ticketWidth={ticketWidth} sectionName={sectionName}/></Main>
    
    </Box>
    </>
  );
}
