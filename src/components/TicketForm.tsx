import { TextField, Card, CardContent, CardActions, Button, MenuItem } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { deleteTicket, editTicket } from '../app/Slice/TicketSlice';
import { useState } from 'react';



export interface Ticket {
  id?: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}
interface ticketFormProps{
    tickets: Ticket
}
const priorities = ['LOW', 'MEDIUM', 'HIGH'];
const statuses = ['NEW', 'IN_PROGRESS', 'COMPLETED', "REJECTED"];

const TicketForm: React.FC<ticketFormProps> = ({tickets}) => {

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
    dispatch(deleteTicket(ticket.id))
    console.log('Delete ticket:', ticket);
  };

  const handleSave = () => {
    setIsEditMode(false);
    dispatch(editTicket(ticket))

  };

  const handleCancel = () => {
    console.log('Cancel edit');
    setIsEditMode(false);

  };

  return (
    <Card sx={{ maxWidth: 300 }}>
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
          value={ticket.due_date.replace('Z', '')} // Remove 'Z' to display in local time
          onChange={handleChange}
          margin="normal"
          disabled={!isEditMode}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
      <CardActions>
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
