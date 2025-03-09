import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import store from "./utils/appStore";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data)); // Uncomment if you want to store user data in Redux store
      // console.log(user.data);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="bg-zinc-800  text-white  ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
