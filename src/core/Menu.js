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
    .get("http://178.62.76.166/api/signout")
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

  return (
    <div>
      <div className="h-10 sm:h-20 hidden sm:flex bg-green-400 items-center p-3 items-center">
        <div>
          <Link
            style={isActive(history, "/")}
            className="font-mono p-2 hidden sm:block"
            to="/"
          >
            ArtBook
          </Link>
        </div>
        <Link
          style={isActive(history, "/users")}
          className="p-2 font-mono hidden sm:block"
          to="/users"
        >
          Users
        </Link>
        {/* <Link
          style={isActive(history, "/")}
          className="font-mono p-2 hidden sm:block"
          to="/"
          >
          Home
        </Link> */}
        {/* <div className="bg-green-400">
          <Link
            style={isActive(history, "/postcreate")}
            to="/postcreate"
            className="p-2 font-mono hidden sm:block"
          >
            Create Post
          </Link>
        </div> */}

        {!isAuthenticated() && (
          <>
            <Link
              style={isActive(history, "/signin")}
              className="p-2 font-mono hidden sm:block"
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              style={isActive(history, "/signup")}
              className="p-2 font-mono hidden sm:block"
              to="/signup"
            >
              Sign Up
            </Link>
            {/* <Link
              style={isActive(history, "/")}
              className="p-2 font-mono hidden sm:block"
              to="/"
            >
              Your Profile
            </Link> */}
          </>
        )}

        {isAuthenticated() && (
          <>
            <button
              className="p-2 hidden font-mono sm:block"
              onClick={() => signOut(() => history.push("/"))}
            >
              {" "}
              Sign Out
            </button>
            <Link
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              to={`/user/${isAuthenticated().user._id}`}
              className="p-2 hidden font-mono sm:block"
            >
              {isAuthenticated().user.name}'s Profile
            </Link>
          </>
        )}
        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <>
            <Link
              to={`/admin`}
              style={isActive(history, `/admin`)}
              className="p-2 hidden font-mono sm:block"
            >
              Admin Dashboard
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
      </div>
      <div className="sm:hidden">
        <div className={isOpen ? "hidden" : "flex bg-green-300"}>
          <div className="p-3 m-2 border bg-gray-100 border-black rounded text-black">
            <div className="p-1 hover:bg-green-100">
              <Link
                to="/"
                className="p-2 font-mono"
                onClick={() => setIsOpen(!isOpen)}
              >
                ArtBook
              </Link>
            </div>
            <div className="p-1 hover:bg-green-100">
              <Link
                to="/users"
                className="font-mono p-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                Users
              </Link>
            </div>
            {/* <div className="p-1 hover:bg-green-100">
              <Link to="/" className="p-2" onClick={() => setIsOpen(!isOpen)}>
                Home
              </Link>
            </div> */}
            {!isAuthenticated() && (
              <>
                <div className="p-1 hover:bg-green-100">
                  <Link
                    to="/signin"
                    className="font-mono p-2"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Sign In
                  </Link>
                </div>
                <div className="p-1 hover:bg-green-100">
                  <Link
                    to="/signup"
                    className="font-mono p-2"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="p-1 hover:bg-green-100">
                  <Link to="/signin" className="font-mono p-2">
                    Create Post
                  </Link>
                </div>
              </>
            )}

            {isAuthenticated() && (
              <>
                <div className="p-1 hover:bg-green-100">
                  <Link
                    className="font-mono p-2"
                    onClick={() => signOut(() => history.push("/"))}
                  >
                    Sign Out
                  </Link>
                </div>
                <div className="p-1 font-mono hover:bg-green-100">
                  <Link
                    to={`/user/${isAuthenticated().user._id}`}
                    className="font-mono p-2"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isAuthenticated().user.name}'s Profile
                  </Link>
                </div>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
              <div className="p-1 font-mono hover:bg-green-100">
                <Link to={`/admin`} className="font-mono p-2">
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Menu);
