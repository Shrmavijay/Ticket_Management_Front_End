import React from "react";
import Card from "@mui/material/Card";
import TicketTable from "../components/TicketTable";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DropResult, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { editTicket } from "../app/Slice/TicketSlice";

interface TicketsPage {
  sectionName: string;
  ticketWidth: number;
}
const TicketsPage: React.FC<TicketsPage> = ({ sectionName, ticketWidth }) => {
  const dispatch = useAppDispatch();
  const status = ["NEW", "IN_PROGRESS", "COMPLETED", "REJECTED"];

  const tickets = useAppSelector((state) => state.ticket.ticket);

  const handleOnDragEnd = (result: DropResult) => {
    console.log("drag result: ", result);
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const dropPoint = result.destination.droppableId;
    reorder(tickets, startIndex, endIndex, dropPoint);
  };

  const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number,
    dropPoint: string
  ) => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    const updatedTicket = { ...removed, status: dropPoint };
    console.log("update: ", updatedTicket);
    result.splice(endIndex, 0, updatedTicket);
    dispatch(editTicket([updatedTicket, result]));
    return result;
  };

  const handleFilter = () => {
    console.log("hello");
  };

  return (
    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
      <div>
        <div className="flex justify-between">
          <span className="self-center font-bold text-xl text-black/60">
            {sectionName}
          </span>

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
              sx={{ border: "black", color: "black" }}
            >
              <FilterAltIcon />
              Filter
            </Button>
          </Card>
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
      </div>
    </DragDropContext>
  );
};

export default TicketsPage;
