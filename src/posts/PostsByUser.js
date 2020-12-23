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
      .get(`http://localhost:8000/posts/by/${userId}`, config)
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
    //   console.log("this needs to cleanup");
    // };
  }, [props.userId]);

  const postsObj = Object.values(state.posts);
  const postsCount = postsObj.length;
  console.log("props", props);
  // const followersCount = props.following.followers.length;
  // const followingCount = props.following.following.length;
  //   console.log("here are your posts", postsObj);
  console.log("here are your posts count", postsObj.length);
  //   console.log("here are your state posts", state.posts);

  return (
    <>
      <div className="bg-green-200 h-screen">
        <div className="flex justify-center items-center bg-green-200 text-2xl font-medium">
          <p className="p-3">
            Posts{" "}
            <Link className="text-green-600" to="">
              {postsCount}
            </Link>
          </p>
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
                            src={`http://localhost:8000/post/photo/${post._id}`}
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
