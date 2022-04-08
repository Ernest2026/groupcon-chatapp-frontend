import React from "react";
import Navbar from "../component/Navbar";
import Registerform from "../component/Registerform";
import { redirect } from "../middleware/build";

const Register = () => {
  redirect();
  return (
    <div
      className="container-fluid bg-primary"
      style={{ minHeight: "100vh", paddingBottom: "3rem" }}
    >
      <Navbar margin="0 6rem" />
      <Registerform />
    </div>
  );
};

export default Register;
