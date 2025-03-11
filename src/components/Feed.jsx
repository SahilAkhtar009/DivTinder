import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (users) return;
    try {
      const Users = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // Store the fetched users in your Redux store or local storage here
      dispatch(addFeed(Users?.data));
    } catch (error) {
      // console.log(error.message);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  if (!users) return;
  if (users.length <= 0) {
    return <h1 className="text-center text-4xl m-4">No New Users Found !</h1>; // replace with your own message or loading indicator when no users are found.  // You can also add a button to refresh the feed if needed.  // For simplicity, I've added a placeholder here.  // Replace the h1 with your own component or element.  // You can also add a button to refresh the feed if needed.  // For simplicity, I've added a placeholder here.  // Replace the h1 with your own component or element.  // You can also add a button to refresh the feed if needed.  // For simplicity, I've added a placeholder here.  // Replace the h1 with your own component or element.  // You can also add a button to refresh the feed if needed.  // For simplicity, I've added a placeholder here.  // Replace the h1 with your own component or element.  // You can also add a button to refresh the feed
  }

  return (
    users && (
      <div className="text-black">
        <UserCard user={users[0]} />
      </div>
    )
  );
};

export default Feed;
