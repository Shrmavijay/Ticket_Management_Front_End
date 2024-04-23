;

import React, { useEffect } from "react";
import NavBar from "../components/NavBar.tsx";
import SideDrawer from "../components/SideDrawer.tsx";
import TicketsPage from "./TicketsPage.tsx";
import { useAppDispatch } from "../hooks.tsx";
import { getdata } from "../app/Slice/TicketSlice.tsx";
import { stringAvatar } from "../utils/avatarUtils..ts";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getdata());
  });
  return (
 
    <>
      <SideDrawer />
    </>
  );
};

export default HomePage;
