import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import UserList from "./pages/UserList";


function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: localStorage.getItem("APtoken") ? <Navigate to="/" /> : <Login />,
    },
    {
      path:"/sign-up",
      element: localStorage.getItem("APtoken") ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "/",
      element: <UserList />,
    },
     
  ]);

  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
      <Toaster />
    </>
  );
}

export default App;