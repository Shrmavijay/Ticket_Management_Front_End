import React from "react";
import Ticket from "./Ticket";
import { useAppSelector } from "../hooks";
import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

interface TicketTableProps {
  status: string;
  ticketWidth: number;
}
const TicketTable: React.FC<TicketTableProps> = ({ status, ticketWidth }) => {
  const tickets = useAppSelector((state) => state.ticket.ticket);
  const filteredTickets = useAppSelector(
    (state) => state.ticket.filteredTickets
  );

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "todo":
        return "bg-blue-500"; 
      case "progress":
        return "bg-yellow-500"; 
      case "done":
        return "bg-green-500"; 
      case "cancelled":
        return "bg-red-500"; 
      default:
        return "bg-gray-500"; 
    }
  }
  return (
    <>
      <div className="flex flex-col mt-2" style={{ width: ticketWidth }}>
        <div className={`w-{full} h-1 ${getStatusColor(status)}`}></div>
        <Box display="flex" flexDirection="column">
          <span>{status}</span>
        </Box>

        {filteredTickets
          ? filteredTickets?.map((ticket, index) =>
              ticket.status.toLowerCase() === status.toLowerCase() ? (
                <div
                  className="draggable-parent"
                  style={{ borderRadius: "15px" }}
                >
                  <Draggable
                    key={ticket.id.toString()}
                    draggableId={ticket.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        key={index}
                        className="mt-6"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          boxShadow:
                            "0 30px 30px -25px rgba(65, 51, 183, 0.25)",
                          ...provided.draggableProps.style,
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Ticket ticket={ticket} ticketWidth={ticketWidth} />
                      </Box>
                    )}
                  </Draggable>
                </div>
              ) : null
            )
          : tickets?.map((ticket, index) =>
              ticket.status.toLowerCase() === status.toLowerCase() ? (
                <Draggable
                  key={ticket.id.toString()}
                  draggableId={ticket.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      key={index}
                      className="mt-6"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "15px",
                        boxShadow: "0 30px 30px -25px rgba(65, 51, 183, 0.25)",
                        ...provided.draggableProps.style,
                      }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Ticket ticket={ticket} ticketWidth={ticketWidth} />
                    </Box>
                  )}
                </Draggable>
              ) : null
            )}
      </div>
      
    </>
  );
};

export default TicketTable;
