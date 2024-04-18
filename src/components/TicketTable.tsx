import TicketForm from './TicketForm'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getdata } from '../app/Slice/TicketSlice';
import { Grid, Pagination } from '@mui/material'; 

const TicketTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  useEffect(() => {
    dispatch(getdata());
  }, []);


  
  const ticket = useAppSelector(state => state.ticket.ticket);

  


  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const indexOfLastTicket = page * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = ticket?.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <>
    <Grid container spacing={2}> 
    {currentTickets && currentTickets?.map((ele: any, index: number) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}> 
        <TicketForm tickets={ele} /> 
      </Grid>
    ))}
  </Grid>
  <Pagination
  count={Math.ceil(ticket?.length / ticketsPerPage)}
  page={page}
  onChange={handleChangePage}
  variant="outlined"
  shape="rounded"
  color="primary"
  className="mt-4"
/>
</>
  );
};

export default TicketTable;





