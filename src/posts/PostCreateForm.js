import React from "react";


const PostCreateForm = () => (
  <div className="h-screen">
    <form
      id="contact-me"
      className="w-full mx-auto max-w-2xl mt-5 rounded border border-gray-300 shadow bg-white p-8 text-gray-700 "
    >
      <h2 className="w-full my-2 text-3xl font-bold leading-tight my-5">
        Add a Post
      </h2>

      <div className="flex flex-wrap mb-6">
        <div className="relative w-full appearance-none label-floating">
          <input
            className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            id="name"
            type="text"
            placeholder="Photo"
            required
          />
          <label
            for="name"
            className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
          >
            Photo
          </label>
        </div>
      </div>

      <div className="flex flex-wrap mb-6">
        <div className="relative w-full appearance-none label-floating">
          <input
            className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            id="name"
            type="text"
            placeholder="Title"
            required
          />
          <label
            for="name"
            className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
          >
            Title
          </label>
        </div>
      </div>

      <div className="flex flex-wrap mb-6">
        <div className="relative w-full appearance-none label-floating">
          <textarea
            className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            id="message"
            type="text"
            placeholder="Comment..."
          ></textarea>
          <label
            for="message"
            className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
          >
            Comment
          </label>
        </div>
      </div>

      <div className="">
        <button
          className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
);

export default PostCreateForm;
