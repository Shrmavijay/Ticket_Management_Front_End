import React, { useState } from "react";
import Ticket from "./Ticket";
import { useAppSelector } from "../hooks";
import { Box, Button, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketPage from "../pages/CreateTicketPage";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface TicketTableProps {
  status: string;
  ticketWidth: number;
}
const TicketTable: React.FC<TicketTableProps> = ({ status, ticketWidth }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tickets = useAppSelector((state) => state.ticket.ticket)
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500"; // Blue for new status
      case "in_progress":
        return "bg-yellow-500"; // Yellow for in-progress status
      case "completed":
        return "bg-green-500"; // Green for completed status
      case "rejected":
        return "bg-red-500"; // Red for rejected status
      default:
        return "bg-gray-500"; // Default color for unknown status
    }
  }

  //   return (
  //     <>
  //       <div className="flex flex-col mt-2">
  //         {/* <div className={`w-{full} h-1 ${getStatusColor(status)}`}></div>
  //         <Box display="flex" flexDirection="column">
  //           <span className="text-xs">status</span>
  //           <span>{status}</span>
  //         </Box>
  //         <Button
  //           variant="outlined"
  //           onClick={handleOpenModal}
  //           sx={{
  //             width:ticketWidth,
  //             borderColor: "rgba(0, 0, 0, 0.2)",
  //             boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  //           }}
  //         >
  //           <AddIcon sx={{ color: "black" }} />
  //         </Button> */}

  //                 {/* {tickets?.map((ticket, index) =>
  //                   ticket.status.toLowerCase() === status.toLowerCase() ? (
  //                     <Draggable
  //                       key={ticket.id.toString()}
  //                       draggableId={ticket.id.toString()}
  //                       index={index}
  //                     >
  //                       {(provided) => (
  //                         <Box
  //                           key={index}
  //                           className="mt-2"
  //                           sx={{
  //                             display: "flex",
  //                             flexDirection: "column",
  //                             boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  //                             ...provided.draggableProps.style,
  //                           }}
  //                           {...provided.draggableProps}
  //                           {...provided.dragHandleProps}
  //                           ref={provided.innerRef}
  //                         >
  //                           <Ticket ticket={ticket} ticketWidth={ticketWidth} />
  //                         </Box>
  //                       )}
  //                     </Draggable>
  //                   ) : null
  //                 )} */}

  //       </div>
  //       <Dialog open={isModalOpen} onClose={handleCloseModal}>

  //         <CreateTicketPage
  //           status={status}
  //           isOpen={true}
  //           onClose={handleCloseModal}
  //         />
  //       </Dialog>

  //     </>
  //   );
  // };

  return (
    <>
      <div className="flex flex-col mt-2" style={{width:ticketWidth}}>
        <div className={`w-{full} h-1 ${getStatusColor(status)}`}></div>
        <Box display="flex" flexDirection="column">
          {/* <span className="text-xs">status</span> */}
          <span>{status}</span>
        </Box>
        {/* <Button
          variant="outlined"
          onClick={handleOpenModal}
          sx={{
            width: ticketWidth,
            borderColor: "rgba(0, 0, 0, 0.2)",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <AddIcon sx={{ color: "black" }} />
        </Button> */}

        {tickets?.map((ticket, index) =>
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
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
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
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <CreateTicketPage
          // status={status}
          isOpen={true}
          onClose={handleCloseModal}
        />
      </Dialog>
    </>
  );
};

export default TicketTable;
