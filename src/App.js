import React from "react";
import { Route, Routes } from "react-router-dom";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Group from "./pages/Group";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Chatroom from "./pages/Chatroom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/group" element={<Group />}></Route>
        <Route path="/chatroom/:groupId" element={<Chatroom />}></Route>
      </Routes>
    </>
  );
}

export default App;
