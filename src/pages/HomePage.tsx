;

import React, { useEffect } from "react";
import SideDrawer from "../components/SideDrawer.tsx";
import { useAppDispatch } from "../hooks.tsx";
import { getdata } from "../app/Slice/TicketSlice.tsx";

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
