// import TicketForm from './TicketForm'
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks';
// import { getdata } from '../app/Slice/TicketSlice';
// import { Grid, Pagination } from '@mui/material';

// const TicketTable: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [page, setPage] = useState(1);
//   const [ticketsPerPage] = useState(10);
//   useEffect(() => {
//     dispatch(getdata());
//   }, []);

//   const ticket = useAppSelector(state => state.ticket.ticket);

//   const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   const indexOfLastTicket = page * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = ticket?.slice(indexOfFirstTicket, indexOfLastTicket);

//   return (
//     <>
//     <Grid container spacing={2}>
//     {currentTickets && currentTickets?.map((ele: any, index: number) => (
//       <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//         <TicketForm tickets={ele} />
//       </Grid>
//     ))}
//   </Grid>
//   <Pagination
//   count={Math.ceil(ticket?.length / ticketsPerPage)}
//   page={page}
//   onChange={handleChangePage}
//   variant="outlined"
//   shape="rounded"
//   color="primary"
//   className="mt-4"
// />
// </>
//   );
// };

// export default TicketTable;

import React from "react";
import Ticket from "./Ticket";
import { useAppSelector } from "../hooks";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface TicketTableProps{
  status: string;
}
const TicketTable: React.FC<TicketTableProps> = ({status}) => {
  const tickets = useAppSelector((state) => state.ticket.ticket);
  function getStatusColor(status:string) {
    console.log(status)
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-500'; // Blue for new status
      case 'in-progress':
        return 'bg-yellow-500'; // Yellow for in-progress status
      case 'completed':
        return 'bg-green-500'; // Green for completed status
      case 'rejected':
        return 'bg-red-500'; // Red for rejected status
      default:
        return 'bg-gray-500'; // Default color for unknown status
    }
  }

  return (<>
    <div className="flex flex-col mt-2">
      <div className={`w-full h-1 ${getStatusColor(status)}`}></div>
      <Box display="flex" flexDirection="column">
      <span className="text-xs">status</span>
      <span>{status}</span>
      </Box>
      <Button variant="outlined" sx={{ borderColor:"rgba(0, 0, 0, 0.2)",boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <AddIcon sx={{color:'black'}}/>
      </Button>
      {tickets?.map((ticket) => (
        <Box className="mt-2" sx={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}> 
        <Ticket ticket={ticket} />
      </Box>
      ))}
    </div>
      </>
  );
};

export default TicketTable;
