import React from 'react';
// import TicketHome from './TicketHome';
import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';

const LoginPage = () => {

  return (
    <div style={{ background: '#f0f5f9' }} className="min-h-screen">
      <AppBar position="static" style={{ background: '#2c3e50' }}>
        {/* <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar> */}
      </AppBar>
      <Container maxWidth="lg" className="py-8">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <TicketHome /> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
