import React from "react";
import axios from "axios";
import { useState } from "react";
import { isAuthenticated } from "../core/Menu";
import { Redirect } from "react-router-dom";

const UserUpdateForm = (props) => {
  const [state, setState] = useState({
    photo: "",
    user: {},
    redirect: false,
  });

  const handlePhotoChange = (e) => {
    console.log(e.target.files[0]);
    const value = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      photo: value,
    }));
  };

  // console.log(userId);

  const createPost = () => {
    const postData = new FormData();
    postData.set("photo", state.photo);
    // console.log(state.photo);
    const userId = isAuthenticated().user._id;
    console.log(userId);
    const token = isAuthenticated().token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    };
    const body = postData;
    axios
      .put(`http://localhost:8000/user/${userId}`, body, config)
      .then(function (response) {
        if (response) {
          console.log(response);
          setState((prevState) => ({
            ...prevState,
            redirect: true,
            photo: "",
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
    <div>
      {state.redirect && (
        <Redirect to={`/user/${isAuthenticated().user._id}`} />
      )}

      <div className="h-screen">
        <div className="mx-auto max-w-2xl mt-5 rounded border border-gray-300 shadow bg-white p-8 text-gray-700 ">
          <h2 className="w-full my-2 text-3xl font-bold leading-tight my-5">
            Add a Profile Pic
          </h2>

          <div className="flex flex-wrap mb-6">
            <div className="relative w-full appearance-none label-floating">
              <input
                className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label
                for="name"
                className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
              >
                Photo
              </label>
            </div>
          </div>

          <div className="">
            <button
              onClick={createPost}
              className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;
