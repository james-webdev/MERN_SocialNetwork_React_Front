import React from "react";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../core/Menu";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import avatarImage from "../images/avatar.PNG";
import PostsByUser from "../posts/PostsByUser";

const Profile = (props) => {
  const [state, setState] = useState({
    user: "",
    redirect: false,
  });

  useEffect(() => {
    const fetchProfile = () => {
      console.log("user ID from route params", props.match.params.userId);
      const userId = props.match.params.userId;
      console.log(userId);
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

  const userId = props.match.params.userId;
  return (
    <>
      {state.redirect && <Redirect to="/signin" />}
      <div className="flex justify-center items-center bg-green-200">
        <div className="bg-green-200">
          {/* <p className="text-3xl font-bold">Profile</p> */}
          <div className="text-3xl font-medium p-2">
            <div className="flex p-2 items-center justify-center">
              <p> {state.user.name}</p>
            </div>
            <div className="flex items-center justify-center w-48 rounded p-2 mt-2">
              <img src={avatarImage} alt={state.user.name}></img>
            </div>
            {/* <p>Joined: {new Date(state.user.created).toDateString()}</p> */}
          </div>
        </div>

        {isAuthenticated().user &&
          isAuthenticated().user._id === state.user._id && (
            <>
              <div className="pt-10 bg-green-200">
                {/* <button class="bg-green-600 shadow hover:bg-green-800 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15">
                  Delete Profile
                </button>

                <button class="bg-green-300 shadow hover:bg-green-200 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15">
                  Edit Profile
                </button> */}

                <Link
                  to={`/postcreate/${isAuthenticated().user._id}`}
                  class="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
                >
                  Create Post
                </Link>
              </div>
            </>
          )}
      </div>
      <PostsByUser userId={userId} />
    </>
  );
};

export default Profile;
