import React from "react";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import axios from "axios";

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
  }, []);

  const usersObj = Object.values(state.users);
  console.log(usersObj);

  return (
    <>
      <div className="text-1xl font-medium p-2">
        <p class="flex-auto w-full">
          {usersObj.map((user, i) => {
            return (
              <div>
                <article class="sm:w-1/3 overflow-hidden rounded-lg shadow-lg">
                  <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                      <a
                        class="no-underline hover:underline text-black"
                        href="#"
                      >
                        {user.name}
                      </a>
                    </h1>
                    <p class="text-grey-darker text-sm">{}</p>
                  </header>
                  <div className="p-20">
                    <button className="bg-green-600 hover:bg-green-800 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                      Delete User
                    </button>

                    <button className="bg-green-300 hover:bg-green-200 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                      Edit User
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </p>
        <p></p>
        <p>Joined: </p>
      </div>
      Name
    </>
  );
};

export default Users;
