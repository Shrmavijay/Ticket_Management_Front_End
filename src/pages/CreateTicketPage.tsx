import React, { useState } from 'react';
import { TextField, Modal, Card, CardContent, CardActions, Button, MenuItem } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { createTicket } from '../app/Slice/TicketSlice';

interface Ticket {
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}

const priorities = ['LOW', 'MEDIUM', 'HIGH'];
const statuses = ['CREATED', 'IN_PROGRESS', 'COMPLETED'];

const CreateTicketPage: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [ticket, setTicket] = useState<Ticket>({
    title: '',
    description: '',
    priority: 'LOW',
    status: 'CREATED',
    due_date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }));
  };

  const handleCreateTicket = () => {
    dispatch(createTicket(ticket));
    // Clear form fields after creating ticket
    setTicket({
      title: '',
      description: '',
      priority: 'LOW',
      status: 'NEW',
      due_date: ''
    });
    onClose(); // Close the modal
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300 }}>
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
        <CardActions>
          <Button variant="contained" onClick={handleCreateTicket}>Create</Button>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CreateTicketPage;
