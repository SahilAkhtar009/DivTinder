import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsloginForm] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Login = async () => {
    try {
      const result = await axios.post(
        "http://localhost:7000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(result.data));
      navigate("/");
      return;
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const SignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    navigate("/profile");
  };

  return (
    <div className="flex justify-center mt-2">
      <div className="card bg-zinc-700 w-[28vw]   ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLoginForm ? "Sign up !" : "Login !"}
          </h2>
          <div className="text-black">
            {isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white mt-3 py-1">
                      FirstName
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input  w-full max-w-xs h-8"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white mt-3 py-1">
                      LastName
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input  w-full max-w-xs  h-8"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white mt-3 py-1">
                  Email ID
                </span>
              </div>
              <input
                type="text"
                className="input  w-full max-w-xs  h-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text text-white mt-1 py-1">
                  Password
                </span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs  h-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error && `Error: ${error}`}</p>
          </div>
          <div className="card-actions flex justify-center  p-2">
            <button className="btn h-8 " onClick={isLoginForm ? SignUp : Login}>
              {isLoginForm ? "Sign up" : "Login"}
            </button>
          </div>
          <p
            className="cursor-pointer text-center font-bold"
            onClick={() => setIsloginForm(!isLoginForm)}
          >
            {isLoginForm ? "Login" : "Sign up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
