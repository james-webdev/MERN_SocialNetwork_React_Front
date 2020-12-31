import React from "react";
import Posts from "../posts/Posts";
import Users from "../users/Users";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";

const Admin = () => {
  const [state, setState] = useState({
    redirectToHome: false,
  });

  useEffect(() => {
    if (isAuthenticated().user.role !== "admin") {
      setState((prevState) => ({
        ...prevState,
        redirectToHome: true,
      }));
    }
  }, []);
  return (
    <>
      {state.redirectToHome && <Redirect to="/signin" />}

      <div className="p-2 bg-green-300 h-screen">
        <div className="bg-green-300 p-2">
          <h2 className="text-3xl p-2 font-bold">Admin Dashboard</h2>
          <div className="">
            <h3 className="text-md p-2 font-bold text-red-500">
              Delete Posts and Users
            </h3>
          </div>
        </div>
        <div className="bg-green-300">
          <div className=" bg-green-300 flex items-center justify-center">
            <div className="">
              <h2 className="flex justify-center items-center text-3xl p-2 font-bold">
                Posts
              </h2>
              <hr />
              <div className="mb-64">
                <Posts />
              </div>
            </div>
            <div className="">
              <hr />
              <Users />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
