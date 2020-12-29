import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../core/Menu";

const SinglePost = (props) => {
  const [state, setState] = useState({
    post: "",
    like: false,
    likes: 0,
    loading: true,
  });

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

  const checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  const likeToggle = () => {
    if (!state.like) {
      const clickLike = () => {
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
              console.log("response.likes", response.data.likes.length);
              setState((prevState) => ({
                ...prevState,
                likes: response.data.likes.length,
                like: checkLike(response.data.likes),
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
        // console.log("clicked here");
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
                like: checkLike(response.data.likes),
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

  const posterId = state.post.postedBy
    ? `/user/${state.post.postedBy._id}`
    : "";
  const posterName = state.post.postedBy
    ? state.post.postedBy.name
    : " Unknown";

  return (
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
              {/* <div className="p-20">
                        <button className="bg-green-600 hover:bg-green-800 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                          Delete User
                        </button>
    
                        <button className="bg-green-300 hover:bg-green-200 text-black text-sm font-bold py-1 px-2 rounded ml-4 mt-3 mr-15">
                          Edit User
                        </button>
                      </div> */}
              {/* {state.like ? (
                <h3 onClick={likeToggle}>
                  <p>liked</p>
                  {state.likes} Like
                </h3>
              ) : (
                <h3 onClick={likeToggle}>
                  <p>not liked</p>
                  {state.likes} Like
                </h3>
              )} */}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;



exports.like = (req, res) => {
    //   Post.findByIdAndUpdate(
    //     req.body.postId,
    //     { $push: { likes: req.body.userId } },
    //     { new: true }
    //   ).exec((err, result) => {
    //     if (err) {
    //       return res.status(400).json({
    //         error: err,
    //       });
    //     }
    //     res.json(result);
    //   });
    // };
    
    // exports.unlike = (req, res) => {
    //   Post.findByIdAndUpdate(
    //     req.body.postId,
    //     { $pull: { likes: req.body.userId } },
    //     { new: true }
    //   ).exec((err, result) => {
    //     if (err) {
    //       return res.status(400).json({
    //         error: err,
    //       });
    //     }
    //     res.json(result);
    //   });
    // };


    router.put("/post/like", like);
router.put("/post/unlike", unlike);