import React from "react";
import Chat from "../component/Chat";

const Chatroom = () => {
  return (
    <div
      className="bg-blue-c container-fluid"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      <Chat padding="3" />
    </div>
  );
};

export default Chatroom;
