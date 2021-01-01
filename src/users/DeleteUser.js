import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";
import { signOut } from "../core/Menu";
// import remove from "../users/Profile";
import { useState } from "react";
import axios from "axios";

const DeleteUser = (props) => {
  const [state, setState] = useState({
    redirect: false,
  });
  const deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = props.userId;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(`http://178.62.76.166/api/user/${userId}`, config)
      .then(function (response) {
        if (response.status === 200) {
          signOut(() => console.log("User is deleted"));
          setState((prevState) => ({
            ...prevState,
            redirect: true,
          }));
        } else {
          console.log("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {state.redirect && <Redirect to="/" />}
      <div>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this profile?")
            ) {
              deleteAccount();
            }
          }}
          class="bg-white shadow text-sm hover:bg-gray-100 text-black font-bold py-2 px-4 rounded mt-3 mr-15"
        >
          Delete Profile
        </button>
      </div>
    </>
  );
};

export default DeleteUser;
