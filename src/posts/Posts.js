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
    return () => {
      setState({});
    };
  }, [state.user]);

  const postsObj = Object.values(state.posts);
  console.log("here are your posts", postsObj);
  console.log("here are your state posts", state.posts);

  return (
    <>
      <div className="text-1xl p-2 bg-green-300 font-medium">
        {/* <p className="text-3xl p-2 font-mono font-bold">Posts</p> */}
        <div className="flex flex-wrap justify-center items-center w-full">
          {postsObj.map((post) => {
            console.log("here is your post", post);
            return post.map((p, i) => {
              //   console.log("here is your p", p);
              const posterId = p.postedBy ? `/user/${p.postedBy._id}` : "";
              const posterName = p.postedBy ? p.postedBy.name : " Unknown";
              return (
                <div className="flex-wrap p-1 sm:p-0" key={i}>
                  <article className="rounded shadow-lg p-1 m-1 bg-gray-100 hover:bg-gray-200">
                    <header className="leading-tight p-1 md:p-4">
                      <div className="flex items-center justify-center w-40 rounded-md p-2 mt-2">
                        <Link to={`/post/${p._id}`}>
                          <img
                            src={`http://localhost:8000/post/photo/${p._id}`}
                            alt={p.title}
                            onError={(i) => (i.target.src = `${avatarImage}`)}
                            className=""
                            style={{ objectFit: "cover", height: "160px" }}
                          />
                        </Link>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="text-lg">{p.title.substring(0, 25)}</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-grey-darker text-sm">
                          {" "}
                          {p.body.substring(0, 25)}
                        </p>
                      </div>
                      <br />
                      <div className="flex items-center justify-center">
                        <p className="text-sm inline">{p.likes.length}</p>
                        {p.likes.length === 1 ? (
                          <p className="text-sm inline pl-1">Like</p>
                        ) : (
                          <p className="text-sm inline pl-1">Likes</p>
                        )}
                        {p.likes.length === 0 ? (
                          <div className="pl-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="pl-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              className="h-3 w-3 fill-current text-red-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <p className="text-xs p-2 sm:p-1">
                        Posted by{" "}
                        <Link className="text-green-400" to={`${posterId}`}>
                          {posterName}{" "}
                        </Link>
                        <br />
                        on {new Date(p.created).toDateString()}
                      </p>
                    </header>
                    {/* <div className="flex items-center justify-center leading-tight pb-6">
                      <Link
                        to={`/post/${p._id}`}
                        className="bg-green-300 hover:bg-green-400 text-black text-sm font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
                      >
                        View Post
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
            });
          })}
        </div>
      </div>
    </>
  );
};

export default Posts;
