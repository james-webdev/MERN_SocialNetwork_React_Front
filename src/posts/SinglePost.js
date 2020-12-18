import React, { useEffect, useState } from "react";
import axios from "axios";

const SinglePost = (props) => {
  const [state, setState] = useState({
    post: "",
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

  return (
    <div>
      <p>SinglePost</p>
      <h1>{state.post.title}</h1>
    </div>
  );
};

export default SinglePost;
