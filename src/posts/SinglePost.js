import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SinglePost = (props) => {
  const [state, setState] = useState({
    post: "",
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
  }, [props.match.params.postId]);

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
            <article className="sm:w-1/3 mx-auto max-w-2xl rounded p-3 shadow-lg m-4 bg-gray-100">
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
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
