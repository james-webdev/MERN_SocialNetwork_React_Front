import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    redirect: false,
  });

  const handleChange = (e) => {
    //    console.log(e);
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("submitted");
    const payload = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    console.log(payload);
    axios
      .post("http://localhost:8000/signup", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage:
              "Registration successful. Redirecting to home page..",
            redirect: true,
          }));
          console.log(state.successMessage);
        } else {
          console.log("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {state.redirect && <Redirect to="/signin" />}

      <div className="bg-green-300 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-gray-100 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              id="name"
              placeholder="Name"
              value={state.name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              id="email"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded border bg-green-200 text-black hover:bg-green-300 focus:outline-none my-1"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>

          <div className="text-black mt-6">
            <a className="no-underline" href="./signin">
              Already have an account? Sign In.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
