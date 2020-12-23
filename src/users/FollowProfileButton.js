import React from "react";

const FollowProfileButton = (props) => (
  <div className="pt-10 bg-green-200">
    {props.following ? (
      <button
        onClick={props.onButtonClick}
        class="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
      >
        Unfollow
      </button>
    ) : (
      <button
        onClick={props.onButtonClick}
        class="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded ml-4 mt-3 mr-15"
      >
        Follow
      </button>
    )}
  </div>
);

export default FollowProfileButton;
