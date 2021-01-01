import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import avatarImage from "../images/avatar.PNG";
import { isAuthenticated } from "../core/Menu";

const PostsByUser = (props) => {
  const [state, setState] = useState({
    posts: {},
    loading: true,
  });

  useEffect(() => {
    const userId = props.userId;
    const token = isAuthenticated().token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`http://178.62.76.166/api/posts/by/${userId}`, config)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            posts: response.data,
            loading: false,
          }));
          console.log(response.data);
        } else {
          console.log("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // return () => {
    //   setState({});
    // };
  }, [props.userId]);

  const postsObj = Object.values(state.posts);
  const postsCount = postsObj.length;
  // console.log("props", props);
  // const followersCount = props.following.followers.length;
  // const followingCount = props.following.following.length;
  //   console.log("here are your posts", postsObj);
  // console.log("here are your posts count", postsObj.length);
  //   console.log("here are your state posts", state.posts);

  return (
    <>
      <div className="bg-green-200 h-screen">
        <div className="flex justify-center items-center bg-green-200 text-2xl font-medium">
          <div className="p-3">
            Posts <p className="text-green-600 inline">{postsCount}</p>
          </div>
          {/* <p className="p-3">
            Followers{" "}
            <Link className="text-green-600" to="">
              {followersCount}
            </Link>{" "}
          </p>
          <p className="p-3">
            Following{" "}
            <Link className="text-green-600" to="">
              {followingCount}
            </Link>{" "}
          </p> */}
        </div>
        <div className="text-1xl flex bg-green-200 font-medium p-2">
          {/* <p className="text-3xl p-2 font-mono font-bold">Posts</p> */}
          <p className="flex flex-wrap justify-center items-center w-full">
            {postsObj.map((post, i) => {
              // console.log("here is your post", post);

              //   console.log("here is your p", p);
              const posterId = post.postedBy
                ? `/user/${post.postedBy._id}`
                : "";
              const posterName = post.postedBy
                ? post.postedBy.name
                : " Unknown";
              return (
                <div className="flex-wrap" key={i}>
                  <article className="rounded shadow-lg m-2 bg-gray-100 hover:bg-gray-200">
                    <header className="leading-tight p-2 md:p-4">
                      <div className="flex items-center justify-center w-40 rounded-md p-2 mt-2">
                        <Link to={`/post/${post._id}`}>
                          <img
                            src={`http://178.62.76.166/api/post/photo/${post._id}`}
                            alt={post.title}
                            onError={(i) => (i.target.src = `${avatarImage}`)}
                            className=""
                            style={{ objectFit: "cover", height: "160px" }}
                          />
                        </Link>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="text-lg">
                          {post.title.substring(0, 25)}
                        </h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-grey-darker text-sm">
                          {" "}
                          {post.body.substring(0, 25)}
                        </p>
                      </div>
                      <br />
                      <div className="flex items-center text-sm justify-center p-1">
                        <div className="inline">{post.likes.length}</div>
                        {post.likes.length === 1 ? (
                          <p className="inline pl-1">Like</p>
                        ) : (
                          <p className="inline pl-1">Likes</p>
                        )}
                        {post.likes.length === 0 ? (
                          <div className="pl-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-4 w-4"
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
                              className="h-4 w-4 fill-current text-red-500"
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
                      <p className="text-xs">
                        Posted by{" "}
                        <Link className="text-green-400" to={`${posterId}`}>
                          {posterName}{" "}
                        </Link>
                        <br />
                        on {new Date(post.created).toDateString()}
                      </p>
                    </header>
                  </article>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default PostsByUser;
