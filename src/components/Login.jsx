import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [Email, setEmail] = useState("rizwan@gmail.com");
  const [Password, setPassword] = useState("Rizwan@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Login = async () => {
    try {
      const result = await axios.post(
        "http://localhost:7000/login",
        {
          email: Email,
          password: Password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(result.data));
      navigate("/");
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center mt-4">
      <div className="card bg-zinc-700 w-96   ">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login!</h2>
          <div className="text-black">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white mt-3 py-1">
                  Email ID
                </span>
              </div>
              <input
                type="text"
                className="input  w-full max-w-xs"
                value={Email}
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
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn mt-3 " onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
