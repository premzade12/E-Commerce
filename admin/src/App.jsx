import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Lists from "./pages/Lists";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";

function App() {
  let { adminData } = useContext(adminDataContext);
  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/lists" element={<Lists />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
