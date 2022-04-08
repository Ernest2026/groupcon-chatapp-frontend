import React from "react";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="row justify-content-between align-items-center mgy mg-lg-01 mg-lg-06">
      <div className="col-lg-6 mg-20 mg-lg-60">
        <img
          src="./images/illustration-mockups.svg"
          alt="Illustration mockup"
          className="illustration-img"
        />
      </div>
      <div className="col-lg-6 pd-lg-5 home-txt ">
        <h2 className="text-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p className="text-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iure
          corrupti. Eius nisi sunt, reiciendis placeat optio laboriosam quas
          minima accusantium iste non reprehenderit adipisci repudiandae
          corrupti exercitationem iure necessitatibus?
        </p>
        <Link to="/group">
          <button className="btn btn-outline-light">Join a group</button>
        </Link>
      </div>
    </div>
  );
};

export default Landingpage;
