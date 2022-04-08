import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "./Svgs";

const navbar = () => {
  const handleClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div
      className="container-fluid navbar navbar-expand-sm text-white py-4 px-3 px-md-5"
      style={{
        height: "auto",
      }}
    >
      <div className="nav-brand">
        <Link to="/">
          <img src="images/Logo.png" alt="Groupcon Logo" />
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
        style={{ padding: "5px" }}
      >
        <Menu />
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="mynavbar"
      >
        <ul className="navbar-nav align-items-md-center">
          <li className="nav-item text-light my-2 my-md-0 me-md-4">
            <Link to="/group">Join Group</Link>
          </li>
          <li className="nav-item text-light">
            {localStorage.userId ? (
              <button className="btn btn-light" onClick={handleClick}>
                Sign Out
              </button>
            ) : (
              <Link to="/register">
                <button className="btn btn-light">Sign In</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default navbar;
