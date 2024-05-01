import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  Menu,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { filterTickets } from "../app/Slice/TicketSlice";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
 
  padding: "0px 8px",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface FilterOptionsProps {
  byPriority: string;
  setByPriority: any;
  byUsers: string;
  setByUsers: any;
  anchorEl: null | HTMLElement;
  setAnchorEl: any;
  tickets: any[];
  isChecked:Boolean
  setIschecked: any
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  byPriority,
  setByPriority,
  setByUsers,
  anchorEl,
  setAnchorEl,
  tickets,
}) => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const toggleMenu =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  // Menu

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (e: any):void=>{
    const filteredTickets = tickets.filter((ticket)=>{
      setByPriority(e.target.value)
      const filterTickets = ticket.priority.toLowerCase() === e.target.value  
      return filterTickets;
    })
    dispatch(filterTickets(filteredTickets))
  }

  // const filterByUsers = (event: any)=>{
  //   setByUsers(event.target.value)
  // }

  
  return (
    <Menu
      anchorEl={anchorEl}
      id="filter-menu"
      open={open}
      onClose={handleClose}
      onClick={() => {}}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          width: "250px",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={toggleMenu("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>By Priority</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            onChange={(e) => {
              handleFilter(e);
            }}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              //   defaultValue="female"
              name="radio-buttons-group"
              value={byPriority}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High"/>
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <MenuItem
        onClick={() => {
          setByPriority("")
          setByUsers("");
          dispatch(filterTickets(null));
        }}
      >
        Clear Filters
      </MenuItem>
    </Menu>
  );
};

export default FilterOptions;
