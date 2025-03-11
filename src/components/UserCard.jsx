import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handlerSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      console.log(res);
    } catch (error) {}
  };

  return (
    <div className="flex justify-center text-black">
      <div className="card card-compact bg-base-100 w-76 shadow-xl">
        <figure>
          <img
            className="rounded-full w-[150px] h-[150px] mt-2"
            src={user.photo}
            alt="Shoes"
          />
        </figure>
        <div className="card-body text-black">
          <h2 className="card-title ">
            Name : {user.firstName + " " + user.lastName}
          </h2>
          <p className="text-xs text-zinc-600">
            {user.age},{user.gender}
          </p>
          <div className="card-title text-zinc-600 flex gap-5 text-sm ">
            this is default about the user !
          </div>
          <h2 className="card-title"></h2>

          <div className="card-actions  fexl justify-between">
            <button
              className="btn btn-secondary w-25"
              onClick={() => handlerSendRequest("ignored", user._id)}
            >
              ignore
            </button>
            <button
              className="btn btn-primary w-25"
              onClick={() => handlerSendRequest("interested", user._id)}
            >
              interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
