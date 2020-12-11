import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
  <div>
      <div className="h-20 bg-green-400 flex items-center p-3 items-center">
        <div>
          <p className="p-3 font-mono">INSTACLONE</p>
        </div>
        <Link className="p-2" to="/">
          Home
        </Link>
        <Link className="p-2" to="/signin">
          {" "}
          Sign In
        </Link>
        <Link className="p-2" to="/signup">
          {" "}
          Sign Up
        </Link>
      </div>
      {/* <div className="h-20 bg-green-400 flex items-center justify-end">
          <button className="p-3">
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button> 
        </div> */}
   
  </div>
);

export default Menu;
