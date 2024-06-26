import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import {  useEffect, useState } from "react";
// import HomePage from "./pages/HomePage";
import HomePage from "./pages/HomePage";
import { useAppDispatch } from "./hooks";
import { getdata } from "./app/Slice/TicketSlice";

function App() {
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState(false);
  
  const checkLogin = async()=>{
    const token = localStorage.getItem('token')
    if(token!==null && token!=='null'){
      // console.log(localStorage.getItem('token'))
      setIsLogin(true)
      dispatch(getdata())
      // await MyfetchMiddleWare({endPoint:'api/tickets'})
    }else{
      setIsLogin(false)
    }
  }
  useEffect(()=>{
    checkLogin()
  })
  return (<div className="sedan-regular">
    <BrowserRouter>
      {!isLogin ? (
        <Routes>
          <Route path="/" element={<LoginForm checkLogin={checkLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* <Route path="/" element={<TicketTable />} /> */}
          {/* <Route path="/ticket" element={<TicketForm/>} /> */}
          


         

        </Routes>
      ) : (
        <Routes>
           <Route path="/" element={<HomePage />} />
        </Routes>
      )}
    </BrowserRouter>
    </div>
  );
}

export default App;
