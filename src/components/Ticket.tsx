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


  const formattedDate = new Date(ticket.due_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  // console.log(formattedDate)
  // const dateTime = new Date(ticket.due_date);
  // const formattedTime = dateTime.toLocaleTimeString('en-US', {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true 
  // });
  
  // console.log(formattedTime);
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
    <Card sx={{ width: ticketWidth, minHeight:100, cursor:"pointer" }} onClick={handleClick}>
      <CardContent sx={{mt:0}}>
        <Typography sx={{ fontSize: 10}} color="text.secondary" gutterBottom>
          {`#${ticket.id}-${ticket.title}`}
        </Typography>
        <Typography variant="h6" component="div" fontSize={13}>
          {`${ticket.description}`}
        </Typography>
        <Typography sx={{fontSize:10, textAlign:'end', display:'flex', justifyContent:'space-between'}} color="text.secondary">
          <span className={`${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
          {formattedDate}
        </Typography>
        {/* <Typography sx={{fontSize:10, textAlign:'end', display:'flex', justifyContent:'flex-end'}} color="text.secondary">
         {formattedTime}
        </Typography> */}
        </CardContent>
    </Card>
 
         <Dialog open={isModalOpen} onClose={handleCloseModal}>
         <TicketForm tickets={ticket}/> 
      </Dialog>
        </>
  );
}

export default Ticket