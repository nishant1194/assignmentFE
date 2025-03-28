 import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import UserList from "./pages/UserList";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react'
 
function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("APtoken");
    setToken(storedToken); // Ensures state updates when token changes
  }, []);

 
  return (
   <>
    <Routes>
         <Route path="/" element={token ? <UserList /> : <Navigate to="/login" />} />
        <Route path="/sign-up" element={!token ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
       </Routes>
      <Toaster />
   </>
   )
}

export default App