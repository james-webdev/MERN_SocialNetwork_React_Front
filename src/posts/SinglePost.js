import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";
import { Redirect } from "react-router-dom";

const SinglePost = (props) => {
  const [state, setState] = useState({
    post: "",
    like: false,
    likes: 0,
    loading: true,
    redirect: false,
  });

  const checkLike = (likes) => {
    console.log("checklike working");
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  useEffect(() => {
    const fetchPost = () => {
      // console.log("user ID from route params", props.match.params.userId);
      const postId = props.match.params.postId;
      console.log(postId);
      axios
        .get(`http://localhost:8000/post/${postId}`)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              post: response.data,
              likes: response.data.likes.length,
              like: checkLike(response.data.likes),
              loading: false,
            }));
            // console.log(response.data);
            // console.log("user in state", state.user);
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
    };
    fetchPost();
    // return () => {
    //   setState({});
    // };
  }, [props.match.params.postId]);

  const likeToggle = () => {
    if (!state.like) {
      const clickLike = () => {
        console.log("clicked like");
        const userId = isAuthenticated().user._id;
        console.log("userId", userId);
        const postId = state.post._id;
        console.log("postId", postId);
        const token = isAuthenticated().token;
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify({ userId, postId });
        // console.log("your body", body);

        axios
          .put("http://localhost:8000/post/like", body, config)
          .then(function (response) {
            if (response.status === 200) {
              console.log("response.likes", response.data);
              setState((prevState) => ({
                ...prevState,
                likes: response.data.likes.length,
                like: !state.like,
              }));
            } else {
              console.log("Some error ocurred");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      clickLike();
    } else {
      const clickUnlike = () => {
        console.log("clicked unlike");
        const userId = isAuthenticated().user._id;
        // console.log("uId", userId);
        const token = isAuthenticated().token;
        const postId = state.post._id;
        // console.log("fId", followId);
        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify({ userId, postId });
        // console.log("your body", body);

        axios
          .put("http://localhost:8000/post/unlike", body, config)
          .then(function (response) {
            if (response.status === 200) {
              setState((prevState) => ({
                ...prevState,
                likes: response.data.likes.length,
                like: !state.like,
              }));
            } else {
              console.log("Some error ocurred");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      clickUnlike();
    }
  };

  const deletePost = () => {
    console.log("delete clicked");
    const token = isAuthenticated().token;
    const postId = state.post._id;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(`http://localhost:8000/post/${postId}`, config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          console.log("posted deleted");
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

  const posterId = state.post.postedBy
    ? `/user/${state.post.postedBy._id}`
    : "";
  const posterName = state.post.postedBy
    ? state.post.postedBy.name
    : " Unknown";

  return (
    <>
      {state.redirect && <Redirect to="/" />}
      <div>
        {state.loading ? (
          <div className="text-2xl mt-40 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div key={state.post._id}>
            <div>
              <article className="mx-auto max-w-sm sm:max-w-xl rounded p-3 shadow-lg m-4 bg-gray-100">
                <header className="leading-tight p-2 md:p-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={`http://localhost:8000/post/photo/${state.post._id}`}
                      alt={state.post.title}
                      className=""
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-center">
                      <h1 className="text-lg">{state.post.title}</h1>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-grey-darker text-sm">
                        {" "}
                        {state.post.body}
                      </p>
                    </div>
                  </div>
                  <br />
                  <p className="text-xs">
                    Posted by{" "}
                    <Link className="text-green-400" to={`${posterId}`}>
                      {posterName}{" "}
                    </Link>
                    <br />
                    on {new Date(state.post.created).toDateString()}
                  </p>
                </header>
                <div className="flex items-center justify-center leading-tight pb-6">
                  {/* <Link
              to={`/post/${p._id}`}
              className="bg-green-300 hover:bg-green-400 text-black text-sm font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
            >
              View Post
            </Link> */}
                </div>
                {isAuthenticated().user &&
                isAuthenticated().user._id === state.post.postedBy._id ? (
                  <div className="p-4 flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (
                          window.confirm("Are you sure to delete this post?")
                        ) {
                          deletePost();
                        }
                      }}
                      className="bg-white shadow hover:bg-gray-100 text-black text-sm font-bold py-2 px-4 rounded"
                    >
                      Delete Post
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {state.like ? (
                  <h3 className="inline pl-1" onClick={likeToggle}>
                    <p className="inline">{state.likes}</p>
                    {state.likes === 1 ? (
                      <p className="inline pl-1">Like</p>
                    ) : (
                      <p className="inline pl-1">Likes</p>
                    )}
                  </h3>
                ) : (
                  <h3 className="inline pl-1" onClick={likeToggle}>
                    <p className="inline">{state.likes}</p>
                    {state.likes === 1 ? (
                      <p className="inline pl-1">Like</p>
                    ) : (
                      <p className="inline pl-1">Likes</p>
                    )}
                  </h3>
                )}
                {state.likes === 0 ? (
                  <div className="p-1" onClick={likeToggle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
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
                  <div className=" p-1" onClick={likeToggle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      className="h-5 w-5 fill-current text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </article>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost;
