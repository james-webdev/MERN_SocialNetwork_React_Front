import React from "react";

const FollowProfileButton = (props) => (
  <div className="pt-10 bg-green-200">
    {props.following ? (
      <button
        onClick={props.onUnFollowButtonClick}
        className="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded"
      >
        Unfollow
      </button>
    ) : (
      <button
        onClick={props.onFollowButtonClick}
        className="bg-white shadow hover:bg-gray-100 text-black font-bold py-2 px-4 rounded"
      >
        Follow
      </button>
    )}
  </div>
);

export default FollowProfileButton;
