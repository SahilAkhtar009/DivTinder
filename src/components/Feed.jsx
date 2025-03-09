import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  console.log("Users", users);
  const fetchFeed = async () => {
    if (users) return;
    try {
      const Users = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // Store the fetched users in your Redux store or local storage here
      dispatch(addFeed(Users?.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    users && (
      <div className="text-black">
        <UserCard user={users[0]} />
      </div>
    )
  );
};

export default Feed;
