// import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';
// // import TicketTable from '../components/TicketTable';
// // import { useState } from 'react';
// // import CreateTicketPage from './CreateTicketPage';
// import { useAppDispatch, useAppSelector } from '../hooks';
// import { logoutUser } from '../app/Slice/TicketSlice';

// const HomePage = () => {
//   const dispatch = useAppDispatch()
//   // const ticket = useAppSelector(state=>state.ticket.ticket)
//   // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   // const createTicket = () => {
//   //   setIsCreateModalOpen(true);
//   // };

//   // const handleCloseCreateModal = () => {
//   //   setIsCreateModalOpen(false);
//   // };
  

//   // const handleLogout = () => {
//   //   localStorage.clear()
//   //   dispatch(logoutUser())
//   //   };

//   return (
//     <div style={{ background: 'rgb(153 168 181)' }} className="min-h-screen">
//       <AppBar position="static" style={{ background: '#2c3e50' }}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center'}}>
//             Ticket Dashboard
//           </Typography>
//           {/* <Typography component='span' sx={{justifySelf:'flex-end'}}>
//             {`Total Count:${ticket.length}`}
//           </Typography> */}
//           {/* <Button color="inherit" onClick={createTicket}>New Ticket</Button> */}
//           {/* <CreateTicketPage isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} /> */}
//           {/* <Button color="inherit" onClick={handleLogout}>Logout</Button> */}
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg" className="py-8">
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             {/* <TicketTable /> */}
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default HomePage;



import React, { useEffect } from 'react';
import NavBar from '../components/NavBar.tsx';
import SideDrawer from '../components/SideDrawer.tsx';
import TicketsPage from './TicketsPage.tsx';
import { useAppDispatch } from '../hooks.tsx';
import { getdata } from '../app/Slice/TicketSlice.tsx';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()

  dispatch(getdata())
  
  return (
    // <div style={{ background: 'rgb(153 168 181)' }} className="min-h-screen">
    //   <NavBar />
    //   <Container maxWidth="lg" className="py-8">
    //     <Grid container spacing={3}>
    //       <Grid item xs={12}>
    //       <TicketTable />
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </div>
    <>
    <SideDrawer />
    </>
  );
};

export default HomePage;
