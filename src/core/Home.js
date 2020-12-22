import React from "react";
import Posts from "../posts/Posts";

const Home = () => (
  <div className="bg-green-300 h-screen">
    <header>
      <div className="bg-green-300 flex items-center justify-center">
        <p className="p-5 m-7 text-3xl font-mono">
          {" "}
          Welcome to ArtBook. Share art with your friends.
        </p>
      </div>
      <Posts />
    </header>
  </div>
);

export default Home;
