import React from "react";
import Landingpage from "../component/Landingpage";
import Navbar from "../component/Navbar";
import { redirect } from "../middleware/build";

const Home = () => {
  redirect();
  return (
    <div
      className="container-fluid bg-primary bg-pattern"
      style={{ paddingBottom: "2rem" }}
    >
      <Navbar />
      <Landingpage />
    </div>
  );
};

export default Home;
