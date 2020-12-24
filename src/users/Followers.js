import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Followers = (props) => {
  const [state, setState] = useState({
    followers: "",
    loading: true,
  });

  useEffect(() => {
    const fetchFollowers = () => {
      console.log("user ID from route params", props.match.params.userId);
      const followerId = props.match.params.userId;
      console.log(followerId);
      axios
        .get(`http://localhost:8000/followers/${followerId}`)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              followers: response.data,
              loading: false,
            }));
            console.log(response.data);
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
    fetchFollowers();
    // return () => {
    //   console.log("this needs to cleanup");
    // };
  }, [props.match.params.userId]);

  const usersObj = Object.values(state.followers);
  //   console.log("state followers", state.followers.followers);
  //   const stateFollowers = state.followers.followers;
  //   console.log("stateFollowers", stateFollowers);
  //   console.log(typeof stateFollowers);
  //   stateFollowers[0].forEach((follower) => {
  //     console.log("follower", follower);
  //   });
  //   for (const [key, value] of Object.entries(stateFollowers)) {
  //     console.log(`${key}: ${value}`);
  //   }
  return (
    <>
      <div className="text-1xl h-sceen bg-green-300 font-medium p-2">
        <p className="text-3xl p-2 font-bold">Followers</p>
        <div className="flex flex-wrap w-full">
          {usersObj.map((user, i) => {
            console.log("users", user);
            return user.map((u) => {
              console.log("u", u);
              return (
                <div className="flex-wrap" key={i}>
                  <article className="rounded-lg shadow-lg m-2 bg-gray-100 hover:bg-gray-200">
                    <header className="leading-tight p-2 md:p-4">
                      <div className="flex items-center justify-center">
                        <h1 className="text-lg">{u.name}</h1>
                      </div>
                    </header>
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
export default Followers;
