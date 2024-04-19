import React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import Ticket from "../components/Ticket";
// import { useAppSelector } from "../hooks";
import TicketTable from "../components/TicketTable";
interface TicketsPage{
    sectionName: string
}
const TicketsPage:React.FC<TicketsPage>= ({sectionName}) => {

  return (
    <div>
      <div className="flex justify-between">
        <span>{sectionName}</span>

        <Card                               //Sort and filter buttons
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
          <FormatAlignLeftIcon />
          <FormatAlignCenterIcon />
          <FormatAlignRightIcon />
          <Divider orientation="vertical" variant="middle" flexItem />
          <FormatBoldIcon />
        </Card>
      </div>
      <div className="flex gap-10">
      <TicketTable status={"New"} />
      <TicketTable status={"In-Progress"}/>
      <TicketTable status={"Completed"} />
      <TicketTable status={"Rejected"} />
      </div>
    </div>
  );
};

export default TicketsPage;
