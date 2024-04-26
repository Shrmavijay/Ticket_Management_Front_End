import React, { useState } from 'react';
import { TextField, Modal, Card, CardContent, CardActions, Button, MenuItem } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { createTicket } from '../app/Slice/TicketSlice';
import MyfetchMiddleWare from '../utils/api';

interface Ticket {
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}

const priorities = ['LOW', 'MEDIUM', 'HIGH'];
const statuses = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'];

const CreateTicketPage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({  isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [ticket, setTicket] = useState<Ticket>({
    title: '',
    description: '',
    priority: 'LOW',
    status: "NEW",
    due_date: ''
  });

  console.log("status in ticket creation: ",ticket.status)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const handleCreateTicket = async() => {
    
    console.log("userID: ", localStorage.getItem('id'))
    const id = localStorage.getItem('id')
    const user_id = Number(id)
    dispatch(createTicket({...ticket,user_id}));
    // await MyfetchMiddleWare({method:'post',endPoint: 'api/tickets/create',options:{data:ticket}})
    // Clear form fields after creating ticket
    setTicket({
      title: '',
      description: '',
      priority: 'LOW',
      status: 'NEW',
      due_date: ''
    });
    onClose(); 
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 471 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={ticket.description}
            onChange={handleChange}
            margin="normal"
            multiline
          />
          <TextField
            select
            fullWidth
            label="Priority"
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            margin="normal"
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
            value={ticket.due_date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
        <CardActions sx={{padding: "16px"}}>
          <Button variant="contained" onClick={handleCreateTicket}>Create</Button>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CreateTicketPage;
