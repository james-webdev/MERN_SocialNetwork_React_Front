import React from "react";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import avatarImage from "../images/avatar.PNG";

const Profile = (props) => {
  const [state, setState] = useState({
    user: "",
    redirect: false,
  });

  useEffect(() => {
    const fetchProfile = () => {
      // console.log("user ID from route params", props.match.params.userId);
      const userId = props.match.params.userId;
      const token = isAuthenticated().token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        key: "value",
      };
      axios
        .get(`http://localhost:8000/user/${userId}`, bodyParameters, config)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              user: response.data,
            }));
            // console.log(response.data);
            // console.log("user in state", state.user);
          } else {
            console.log("Some error ocurred");
            setState((prevState) => ({
              ...prevState,
              redirect: true,
            }));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchProfile();
  }, [props.match.params.userId]);

  return (
    <>
      {state.redirect && <Redirect to="/signin" />}
      <div className="block sm:flex h-screen bg-green-100">
        <div className="p-20 bg-green-100">
          <p className="text-3xl font-bold">Profile</p>
          <div className="text-1xl font-medium p-2">
            <p>Hello {state.user.name}</p>
            <p>Email:{state.user.email}</p>
            <div className="flex items-center justify-center w-40 rounded-md p-2 mt-2">
              <img src={avatarImage} alt={state.user.name}></img>
            </div>
            <p>Joined: {new Date(state.user.created).toDateString()}</p>
          </div>
        </div>

        {isAuthenticated().user &&
          isAuthenticated().user._id === state.user._id && (
            <>
              <div className="p-20 bg-green-100">
                {/* <button class="bg-green-600 shadow hover:bg-green-800 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15">
                  Delete Profile
                </button>

                <button class="bg-green-300 shadow hover:bg-green-200 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15">
                  Edit Profile
                </button> */}

                <Link
                  to="/postcreate"
                  class="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
                >
                  Create Post
                </Link>
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default Profile;
