import React from "react";
import axios from "axios";
import { useState } from "react";
import { isAuthenticated } from "../core/Menu";

const PostCreateForm = (props) => {
  const [state, setState] = useState({
    title: "",
    body: "",
    photo: "",
    user: {},
    redirect: false,
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
    postData.set("title", state.title);
    postData.set("body", state.body);
    postData.set("photo", state.photo);
    // console.log(state.photo);
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    };
    const body = postData;
    axios
      .post(`http://localhost:8000/post/new/${userId}`, body, config)
      .then(function (response) {
        if (response) {
          console.log(response);
        } else {
          console.log("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="h-screen">
      <div
        id="contact-me"
        className="w-full mx-auto max-w-2xl mt-5 rounded border border-gray-300 shadow bg-white p-8 text-gray-700 "
      >
        <h2 className="w-full my-2 text-3xl font-bold leading-tight my-5">
          Add a Post
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

        <div className="flex flex-wrap mb-6">
          <div className="relative w-full appearance-none label-floating">
            <input
              className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
            />
            <label
              for="name"
              className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
            >
              Title
            </label>
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="relative w-full appearance-none label-floating">
            <textarea
              className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
              id="body"
              type="text"
              placeholder="Comment..."
              value={state.body}
              onChange={handleChange}
              name="body"
            ></textarea>
            <label
              for="message"
              className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
            >
              Comment
            </label>
          </div>
        </div>

        <div className="">
          <button
            onClick={createPost}
            className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreateForm;
