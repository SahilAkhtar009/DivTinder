import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/RequestSlice";

const RequestPage = () => {
  const dispatch = useDispatch();
  const allRequest = useSelector((store) => store.request);
  // console.log(allRequest);

  const requestHandler = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );

    dispatch(removeRequest(_id));
  };
  const Requests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });

    dispatch(addRequest(res.data.data));
  };
  useEffect(() => {
    Requests();
  }, []);

  return (
    <div className="text-center  p-2 flex flex-col items-center bg-zinc-800">
      <h1 className="text-2xl">ConnectionsRequests</h1>
      {allRequest.map((req, index) => {
        const { firstName, lastName, photo, age, gender } = req.fromUserId;
        return (
          <div
            className=" rounded-md  flex p-2 items-center justify-between gap-2 mt-2 w-1/2 h-25 bg-zinc-700"
            key={index}
          >
            <img
              className="rounded-full w-20 h-20 "
              src={photo}
              alt={firstName}
              width="100"
              height="100"
            />
            <div>
              <h3 className="text-1xl">
                {firstName} {lastName}
              </h3>
              {gender && age && (
                <p className="text-sm text-zinc-300">
                  {gender},{age}
                </p>
              )}
            </div>
            <div className="flex gap-5 px-4">
              <button
                className="btn btn-active btn-primary"
                onClick={() => requestHandler("rejected", req._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-secondary"
                onClick={() => requestHandler("accepted", req._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestPage;
