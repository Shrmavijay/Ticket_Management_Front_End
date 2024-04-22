import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TicketForm, { Ticket as TicketInterFace} from './TicketForm';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';



interface TicketProps{
  ticket: TicketInterFace
  ticketWidth: number
}












const Ticket:React.FC<TicketProps>=({ticket, ticketWidth})=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true)
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  function getPriorityColor(priority:string) {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'text-blue-500'; 
      case 'medium':
        return 'text-yellow-500'; 
      case 'high':
        return 'text-red-500'; 
      default:
        return 'text-gray-500'; 
    }
  }
 return (
  <>
    <Card sx={{ width: ticketWidth, minHeight:100,cursor:"pointer" }} onClick={handleClick}>
      <CardContent sx={{mt:0}}>
        <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom>
          {`#${ticket.id}-${ticket.title}`}
        </Typography>
        <Typography variant="h6" component="div" fontSize={13}>
          {`${ticket.description}`}
        </Typography>
        <Typography sx={{fontSize:10, textAlign:'end', display:'flex', justifyContent:'space-between'}} color="text.secondary">
          <span className={`${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>{ticket.due_date.toString().split("T")[0]}
        </Typography>
        <Typography sx={{fontSize:10, textAlign:'end', display:'flex', justifyContent:'flex-end'}} color="text.secondary">
         {ticket.due_date.toString().split("T")[1].split(".")[0]}
        </Typography>
   
      </CardContent>

    </Card>
 
         <Dialog open={isModalOpen} onClose={handleCloseModal}>
         <TicketForm tickets={ticket}/> 
      </Dialog>
        </>
  );
}

export default Ticket