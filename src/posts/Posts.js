import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import avatarImage from "../images/avatar.PNG";

const Posts = (props) => {
  const [state, setState] = useState({
    posts: {},
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts`)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            posts: response.data,
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
  }, [state.user]);

  const postsObj = Object.values(state.posts);
  console.log("here are your posts", postsObj);
  console.log("here are your state posts", state.posts);

  return (
    <>
      <div className="text-1xl bg-green-300 font-medium p-2">
        <p className="text-3xl p-2 font-mono font-bold">Posts</p>
        <p className="flex flex-wrap w-full">
          {postsObj.map((post, i) => {
            console.log("here is your post", post);
            return post.map((p) => {
              //   console.log("here is your p", p);
              return (
                <div className="flex-wrap" key={i}>
                  <article className="rounded shadow-lg m-2 bg-gray-100 hover:bg-gray-200">
                    <header className="leading-tight p-2 md:p-4">
                      <div className="flex items-center justify-center w-40 rounded-md p-2 mt-2">
                        <img
                          src={`http://localhost:8000/post/photo/${p._id}`}
                          alt={p.title}
                          onError={(i) => (i.target.src = `${avatarImage}`)}
                          className=""
                          style={{ height: "150px", width: "100%" }}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="text-lg">{p.title}</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-grey-darker text-sm"> {p.body}</p>
                      </div>
                    </header>
                    <div className="flex items-center justify-center leading-tight pb-6">
                      <Link
                        to={`/${post._id}`}
                        className="bg-green-300 hover:bg-green-400 text-black text-sm font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
                      >
                        View Post
                      </Link>
                    </div>
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
            });
          })}
        </p>
      </div>
    </>
  );
};

export default Posts;
