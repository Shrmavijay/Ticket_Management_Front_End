import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsLogin(true)
    }
  },[])
  return (
    <BrowserRouter>
      {!isLogin ? (
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
