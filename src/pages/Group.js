import React from "react";
import Groupform from "../component/Groupform";
import Navbar from "../component/Navbar";

const Group = () => {
  return (
    <div
      className="container-fluid bg-primary"
      style={{ minHeight: "100vh", paddingBottom: "3rem" }}
    >
      <Navbar />
      <Groupform />
    </div>
  );
};

export default Group;
