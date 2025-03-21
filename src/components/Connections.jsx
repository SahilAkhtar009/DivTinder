import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";

import { addConnection } from "../utils/ConnectionSlice";

const Connections = () => {
  const ConnectionUser = useSelector((store) => store.connection);
  // console.log("Connections", ConnectionUser);
  const dispatch = useDispatch();
  const Connections = async () => {
    const res = await axios.get(BASE_URL + "/user/connection", {
      withCredentials: true,
    });

    dispatch(addConnection(res.data.connectionsData));
  };
  useEffect(() => {
    Connections();
  }, []);

  if (!ConnectionUser) {
    return;
  }
  if (ConnectionUser.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center py-5 flex flex-col items-center bg-zinc-800">
      <h1 className="text-2xl font-bold">Connections</h1>
      {ConnectionUser.map((con, index) => {
        const { firstName, lastName, photo, age, gender } = con;
        return (
          <div
            className=" rounded-md  flex p-2 px-7 items-center  mt-2 w-1/2 h-25 bg-zinc-700 "
            key={index}
          >
            <img
              className="rounded-full w-20 h-20 "
              src={photo}
              alt={firstName}
              width="100"
              height="100"
            />
            <div className="ml-[15vw]">
              <h3 className="text-1xl">
                {firstName} {lastName}
              </h3>
              {gender && age && (
                <p className="text-sm text-zinc-300">
                  {gender},{age}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
