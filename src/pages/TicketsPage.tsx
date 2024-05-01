import React, { useState } from "react";
import Card from "@mui/material/Card";
import TicketTable from "../components/TicketTable";
import { Button, Dialog } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DropResult, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateTickets } from "../app/Slice/TicketSlice";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketPage from "./CreateTicketPage";
import MyfetchMiddleWare from "../utils/api";
import GetDataloader from "../utils/GetDataloader";
import FilterOptions from "../utils/FilterMenu";

interface TicketsPage {
  sectionName: string;
  ticketWidth: number;
}
const TicketsPage: React.FC<TicketsPage> = ({ sectionName, ticketWidth }) => {
  const dispatch = useAppDispatch();
  const status = ["TODO", "PROGRESS", "DONE", "CANCELLED"];
  const isLoading = useAppSelector((state) => state.ticket.isLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [byUsers, setByUsers] = useState("");
  const [byPriority, setByPriority] = useState("");
  const [isChecked, setIschecked] = useState(false);

  const tickets = useAppSelector((state) => state.ticket.ticket);

  //Drag and Drop Result
  const handleOnDragEnd = (result: DropResult) => {
    // console.log("drag result: ", result);
    if (!result.destination) {
      return;
    }
    // const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const dropPoint = result.destination.droppableId;
    const ticketId = result.draggableId;
    reorder(tickets, endIndex, dropPoint, ticketId);
  };

  const reorder = async (
    list: any[],
    // startIndex: number,
    endIndex: number,
    dropPoint: string,
    ticketId: string
  ) => {
    let result = Array.from(list);
    const [ticket] = result.filter((element) => element.id == ticketId);
    // const [removed] = result.splice(startIndex, 1);
    const updatedTicket = { ...ticket, status: dropPoint };
    // console.log("update: ", updatedTicket);
    result.splice(endIndex, 0, updatedTicket);
    // dispatch(editTicket([updatedTicket, result]));

    dispatch(updateTickets(updatedTicket));
    // const updatedData = {
    //   method: "PUT",
    //   endPoint: `api/tickets/${updatedTicket.id}`,
    //   options: { ...updatedTicket },
    // };
    await MyfetchMiddleWare({
      endPoint: `api/tickets/${updatedTicket.id}`,
      method: "put",
      options: {
        data: updatedTicket,
        headers: {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      },
    });
    return result;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <div className="flex justify-between">
          <span className="self-center font-bold text-xl text-black/60">
            {sectionName}
          </span>
          <div className="flex">
            <Button
              onClick={handleOpenModal}
              style={{
                marginRight: "5px",
                display: "flex",
                outline: "1px solid rgb(0,0,0,0.2",
              }}
            >
              <AddIcon sx={{ alignSelf: "center" }}></AddIcon>
            </Button>
            <div style={{ display: "flex" }}>
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
                  onClick={openFilterMenu}
                  size="small"
                  sx={{ color: "black" }}
                >
                  <FilterAltIcon />
                  Filter
                </Button>
              </Card>
              <FilterOptions
                anchorEl={anchorEl}
                setByPriority={setByPriority}
                byPriority={byPriority}
                setByUsers={setByUsers}
                byUsers={byUsers}
                setAnchorEl={setAnchorEl}
                tickets={tickets}
                isChecked={isChecked}
                setIschecked={setIschecked}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-7 justify-left">
          {!isLoading ? (
            status.map(
              (status: string, index: React.Key | null | undefined) => (
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
              )
            )
          ) : (
            <GetDataloader />
          )}
        </div>
      </DragDropContext>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <CreateTicketPage
          isOpen={true}
          onClose={handleCloseModal}
        />
      </Dialog>
    </div>
  );
};

export default TicketsPage;
