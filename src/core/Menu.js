import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffffff" };
  } else return { color: "#008000" };
};
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signOut = (next) => {
  console.log("signing out");
  localStorage.removeItem("jwt");
  next();
  axios
    .get("http://localhost:8000/signout")
    .then(function (response) {
      console.log("sign out", response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Menu = ({ history }) => {
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
  });

  // const handleToggle = () => {
  //   console.log("toggle burger");
  //   setIsOpen((prevState) => ({
  //     ...prevState,
  //     isOpen: !isOpen,
  //   }));
  //   console.log(isOpen);
  // };
  return (
    <div>
      <div className="h-10 sm:h-20 hidden sm:flex bg-green-400 items-center p-3 items-center">
        <div>
          <p className="p-3 text-md hidden sm:block font-mono">InstaClone</p>
        </div>
        <Link
          style={isActive(history, "/")}
          className="p-2 hidden sm:block"
          to="/users"
        >
          Users
        </Link>
        <Link
          style={isActive(history, "/")}
          className="p-2 hidden sm:block"
          to="/"
        >
          Home
        </Link>

        {!isAuthenticated() && (
          <>
            <Link
              style={isActive(history, "/signin")}
              className="p-2 hidden sm:block"
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              style={isActive(history, "/signup")}
              className="p-2 hidden sm:block"
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}

        {isAuthenticated() && (
          <>
            <button
              className="p-2 hidden sm:block"
              onClick={() => signOut(() => history.push("/"))}
            >
              {" "}
              Sign Out
            </button>
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              className="p-2 hidden sm:block"
            >
              {isAuthenticated().user.name}'s Profile
            </Link>
          </>
        )}
      </div>
      <div className="sm:hidden p-1 bg-green-400">
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 border-2 border-white border-opacity-50 m-1 rounded"
          >
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        </div>
        <div>
          <div className={isOpen ? "hidden" : "block"}>
            <Link className="p-2">somethign</Link>
            <Link className="p-2">ooioi</Link>
            <Link className="p-2">oihoihoi</Link>
            <Link className="p-2">oihoiho</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
