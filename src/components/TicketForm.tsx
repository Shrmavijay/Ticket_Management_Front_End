import { TextField, Card, CardContent, CardActions, Button, MenuItem } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { deleteTicket, editTicket } from '../app/Slice/TicketSlice';
import { useState } from 'react';
import Swal from 'sweetalert2';
import './TicketForm.css'
import CloseIcon from '@mui/icons-material/Close';



export interface Ticket {
  id?: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}
interface ticketFormProps{
  handleCloseModal:any,
    tickets: Ticket
}
const priorities = ['LOW', 'MEDIUM', 'HIGH'];
const statuses = ["TODO", "PROGRESS", "DONE", "CANCELLED"];

const TicketForm: React.FC<ticketFormProps> = ({tickets,handleCloseModal}) => {

  const dispatch = useAppDispatch()
  const [ticket,setTicket] = useState<Ticket>({...tickets})
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = () => {
    handleCloseModal()
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your ticket has been deleted.",
          icon: "success",
        });
        dispatch(deleteTicket(ticket.id))
      }
    });
    
    // console.log('Delete ticket:', ticket);
  };

  const handleSave = () => {
    setIsEditMode(false);
    dispatch(editTicket(ticket))

  };

  const handleCancel = () => {
    // console.log('Cancel edit');
    setIsEditMode(false);

  };

  return (
    <Card sx={{ maxWidth: 600, display:'flex',overflow:"scroll", flexDirection:"column" }}>
      <span onClick={handleCloseModal} style={{alignSelf: 'flex-end',cursor:"pointer"}}>
      <CloseIcon fontSize="medium" />
      </span>
      <CardContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={ticket.title}
          onChange={handleChange}
          margin="normal"
          disabled={!isEditMode}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={ticket.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          disabled={!isEditMode}
        />
        
        <TextField
          select
          fullWidth
          label="Priority"
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
          margin="normal"
          disabled={!isEditMode}
        >
          {priorities.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={ticket.status}
          onChange={handleChange}
          margin="normal"
          disabled={!isEditMode}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Due Date"
          name="due_date"
          type="datetime-local"
          value={ticket.due_date.replace('Z', '')} 
          onChange={handleChange}
          margin="normal"
          disabled={!isEditMode}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
      <CardActions sx={{padding:"16px"}}>
        {isEditMode ? (
          <>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleEdit}>Edit</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TicketForm;
