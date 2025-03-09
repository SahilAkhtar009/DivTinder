import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);
  const logOut = async () => {
    try {
      const islogOut = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      console.log(islogOut);
      if (islogOut) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-black text-white shadow-sm">
      <div className="flex-1">
        <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
          👩‍💻 DivTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <h1>Welcome, {user.firstName}</h1>
          <div className="dropdown dropdown-end mx-5 text-black">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photo} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Request</Link>
              </li>
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
