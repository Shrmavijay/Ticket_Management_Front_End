import React, { useState } from "react";
import Card from "@mui/material/Card";
import TicketTable from "../components/TicketTable";
import { Avatar, Box, Button, Dialog, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { editTicket, updateTickets } from "../app/Slice/TicketSlice";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketPage from "./CreateTicketPage";
import MyfetchMiddleWare from "../utils/api";


interface TicketsPage {
  sectionName: string;
  ticketWidth: number;
}
const TicketsPage: React.FC<TicketsPage> = ({ sectionName, ticketWidth }) => {
  const dispatch = useAppDispatch();
  // const status = ["TODO", "PROGRESS", "COMPLETED", "CANCEL"];
  const status = ["NEW", "IN_PROGRESS", "COMPLETED", "REJECTED"]
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const tickets = useAppSelector((state) => state.ticket.ticket);

  const handleOnDragEnd = (result: DropResult) => {
    console.log("drag result: ", result);
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const dropPoint = result.destination.droppableId;
    const ticketId = result.draggableId;
    reorder(tickets, startIndex, endIndex, dropPoint, ticketId);
  };

  const reorder = async(
    list: any[],
    startIndex: number,
    endIndex: number,
    dropPoint: string,
    ticketId: string
  ) => {
    let result = Array.from(list);
    const [ticket] = result.filter((element) => element.id == ticketId);
    const [removed] = result.splice(startIndex, 1);
    const updatedTicket = { ...ticket, status: dropPoint };
    console.log("update: ", updatedTicket);
    result.splice(endIndex, 0, updatedTicket);
    // dispatch(editTicket([updatedTicket, result]));

    dispatch(updateTickets(updatedTicket))
    // const updatedData = {
    //   method: "PUT",
    //   endPoint: `api/tickets/${updatedTicket.id}`,
    //   options: { ...updatedTicket },
    // };
    await MyfetchMiddleWare({endPoint:`api/tickets/${updatedTicket.id}`,method:"put",options:{
      data: updatedTicket,
      headers: {
        headers:{
          authorization: localStorage.getItem('token')
        }
      }
    }})
    return result;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilter = () => {
    console.log("hello");
    handleOpen();
  };

  //   return (
  //     // <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
  //     <div>
  //       <div className="flex justify-between">
  //         <span className="self-center font-bold text-xl text-black/60">
  //           {sectionName}
  //         </span>

  //         <Card //Sort and filter buttons
  //           variant="outlined"
  //           sx={{
  //             display: "flex",
  //             color: "text.secondary",
  //             "& svg": {
  //               m: 1,
  //             },
  //             "& hr": {
  //               mx: 0.5,
  //             },
  //           }}
  //         >
  //           <Button
  //             variant="outlined"
  //             onClick={handleFilter}
  //             size="small"
  //             sx={{ border: "black", color: "black" }}
  //           >
  //             <FilterAltIcon />
  //             Filter
  //           </Button>
  //         </Card>
  //       </div>
  //       {/* <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
  //         <div className="flex gap-2 mt-7 justify-between">
  //           {status.map((status: string, index: React.Key | null | undefined) => (
  //             <Droppable key={index} droppableId={`${status}`}>
  //               {(provided) => (
  //                 <div ref={provided.innerRef} {...provided.droppableProps}>
  //                   <TicketTable
  //                     status={status}
  //                     ticketWidth={ticketWidth}
  //                     key={index}
  //                   />
  //                   {provided.placeholder}
  //                 </div>
  //               )}
  //             </Droppable>
  //           ))}
  //         </div>
  //       </DragDropContext> */}

  // <div className="flex gap-2 mt-7 justify-between">
  //           {status.map((status: string, index: React.Key | null | undefined) => (
  //             <TicketTable
  //                     status={status}
  //                     ticketWidth={ticketWidth}
  //                     key={index}
  //                   />
  //                 ))}
  //     </div>
  //     </div>
  //   );
  // };
  return (
    <div>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <div className="flex justify-between">
          <span className="self-center font-bold text-xl text-black/60">
            {sectionName}
          </span>
          <div className="flex">
        
            <Button onClick={handleOpenModal}  style={{marginRight:"20px",display:"flex"}}>
              <AddIcon sx={{alignSelf:'center'}}></AddIcon>
            </Button>
          <div style={{display: 'flex'}}>
          <Card //Sort and filter buttons
            variant="outlined"
            sx={{
              display: "flex",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
              "& hr": {
                mx: 0.5,
              },
            }}
          >
            <Button
              variant="outlined"
              onClick={handleFilter}
              size="small"
              sx={{ color: "black" }}
            >
              <FilterAltIcon />
              Filter
            </Button>
          </Card>
      
          </div>
          </div>
          
        </div>
        <div className="flex gap-2 mt-7 justify-between">
          {status.map((status: string, index: React.Key | null | undefined) => (
            <Droppable key={index} droppableId={`${status}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TicketTable
                    status={status}
                    ticketWidth={ticketWidth}
                    key={index}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>

           <CreateTicketPage
            //  status={status}
             isOpen={true}
             onClose={handleCloseModal}
           />
         </Dialog>
    </div>
  );
};

export default TicketsPage;































// import React, { useState } from "react";
// import Card from "@mui/material/Card";
// import TicketTable from "../components/TicketTable";
// import { Button, Menu, MenuItem } from "@mui/material";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { DropResult, DragDropContext, Droppable } from "react-beautiful-dnd";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { editTicket } from "../app/Slice/TicketSlice";

// interface TicketsPage {
//   sectionName: string;
//   ticketWidth: number;
// }

// const TicketsPage: React.FC<TicketsPage> = ({ sectionName, ticketWidth }) => {
//   const dispatch = useAppDispatch();
//   const status = ["NEW", "IN_PROGRESS", "COMPLETED", "REJECTED"];
//   const tickets = useAppSelector((state) => state.ticket.ticket);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   // const tickets = useAppSelector((state) => state.ticket.ticket);

//   const handleOnDragEnd = (result: DropResult) => {
//     if (!result.destination) {
//       return;
//     }
//     const startIndex = result.source.index;
//     const endIndex = result.destination.index;
//     const dropPoint = result.destination.droppableId;
//     const ticketId = result.draggableId;
//     reorder(tickets, startIndex, endIndex, dropPoint, ticketId);
//   };

//   const reorder = (
//     list: any[],
//     startIndex: number,
//     endIndex: number,
//     dropPoint: string,
//     ticketId: string
//   ) => {
//     let result = Array.from(list);
//     const [ticket] = result.filter((element) => element.id === ticketId);
//     const [removed] = result.splice(startIndex, 1);
//     const updatedTicket = { ...ticket, status: dropPoint };
//     result.splice(endIndex, 0, updatedTicket);
//     dispatch(editTicket([updatedTicket, result]));
//     return result;
//   };

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleFilter = (selected: string | null) => {
//     setSelectedStatus(selected);
//     handleClose();
//   };

//   const filteredTickets = selectedStatus
//     ? tickets.filter((ticket) => ticket.status === selectedStatus)
//     : tickets;

//   return (
//     <div>
//       <div className="flex justify-between">
//         <span className="self-center font-bold text-xl text-black/60">
//           {sectionName}
//         </span>
//         <Card variant="outlined">
//           <Button
//             variant="outlined"
//             onClick={handleOpen}
//             size="small"
//             sx={{ border: "black", color: "black" }}
//           >
//             <FilterAltIcon />
//             Filter
//           </Button>
//           <Menu
//             anchorEl={isOpen ? document.getElementById("filter-menu") : null}
//             open={isOpen}
//             onClose={handleClose}
//             id="filter-menu"
//           >
//             {status.map((statusOption) => (
//               <MenuItem
//                 key={statusOption}
//                 onClick={() => handleFilter(statusOption)}
//               >
//                 {statusOption}
//               </MenuItem>
//             ))}
//           </Menu>
//         </Card>
//       </div>
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <div className="flex gap-2 mt-7 justify-between">
//           {status.map((status: string, index: number) => (
//             <Droppable key={index} droppableId={`${status}`}>
//               {(provided) => (
//                 <div ref={provided.innerRef} {...provided.droppableProps}>
//                   <TicketTable
//                     // tickets={filteredTickets.filter(
//                     //   (ticket) => ticket.status === status
//                     // )}
//                     status={status}
//                     ticketWidth={ticketWidth}
//                     key={index}
//                   />
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default TicketsPage;
