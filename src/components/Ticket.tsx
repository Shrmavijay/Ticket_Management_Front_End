import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Ticket as TicketInterFace} from './TicketForm';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

interface TicketProps{
  ticket: TicketInterFace
}

const Ticket:React.FC<TicketProps>=({ticket})=> {
  console.log(ticket)
 return (
    <Card sx={{ maxWidth: 200, maxHeight:100 }}>
      <CardContent sx={{mt:0}}>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          {`#${ticket.id}-${ticket.title}`}
        </Typography>
        <Typography variant="h6" component="div" fontSize={15}>
          {`${ticket.description}`}
        </Typography>
        <Typography sx={{fontSize:12, textAlign:'end'}} color="text.secondary">
          {`${ticket.priority}  ${ticket.due_date}`}
        </Typography>
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default Ticket