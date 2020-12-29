import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import avatarImage from "../images/avatar.PNG";
import { Link } from "react-router-dom";

const Users = (props) => {
  const [state, setState] = useState({
    users: {},
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users`)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            users: response.data,
          }));
          console.log(response.data);
          console.log("user in state", state.user);
        } else {
          console.log("Some error ocurred");
          setState((prevState) => ({
            ...prevState,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      setState({});
    };
  }, [state.user]);

  const usersObj = Object.values(state.users);
  console.log(usersObj);

  return (
    <>
      <div className="text-1xl h-sceen bg-green-300 font-medium p-2">
        <p className="text-3xl p-2 font-bold">Users</p>
        <div className="flex flex-wrap w-full">
          {usersObj.map((user, i) => {
            return (
              <div className="flex-wrap" key={i}>
                <article className="rounded-lg shadow-lg m-2 bg-gray-100 hover:bg-gray-200">
                  <header className="leading-tight p-2 md:p-4">
                    <div className="flex items-center justify-center">
                      <h1 className="text-lg">{user.name}</h1>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-grey-darker text-sm"> {user.email}</p>
                    </div>
                    <Link
                      to={`user/${user._id}`}
                      className="flex items-center justify-center w-36 rounded-md p-2 mt-2"
                    >
                      <img
                        src={`http://localhost:8000/user/photo/${user._id}`}
                        onError={(i) => (i.target.src = `${avatarImage}`)}
                        alt={user.name}
                        style={{ objectFit: "cover", height: "160px" }}
                      ></img>
                    </Link>
                  </header>
                  {/* <div className="flex items-center justify-center leading-tight pb-6">
                    <Link
                      to={`user/${user._id}`}
                      className="bg-green-300 hover:bg-green-400 text-black text-sm font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
                    >
                      View Profile
                    </Link>
                  </div> */}
                  {/* <div className="p-20">
                    <button className="bg-green-600 hover:bg-green-800 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                      Delete User
                    </button>

                    <button className="bg-green-300 hover:bg-green-200 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                      Edit User
                    </button>
                  </div> */}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Users;
