import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photo, setPhoto] = useState(user.photo || "");
  const [ToatShow, setToatShow] = useState(false);
  const dispatch = useDispatch();
  const UpdateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, photo },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      setToatShow(true);
      setTimeout(() => {
        setToatShow(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    user && (
      <div className="flex justify-center items-center py-2  gap-10 bg-zinc-800 ">
        <div className="flex justify-center shrink h-1/2 ">
          <div className="card bg-zinc-700  w-86 h-116">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Profile !</h2>
              <div className="text-black">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white  py-1">
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
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text text-white mt-1 py-1">
                      LastName
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs h-8"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text text-white mt-1 py-1">Age</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs h-8"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text text-white mt-1 py-1">
                      Gender
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs h-8"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text text-white mt-1 py-1">
                      photo
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs h-8"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </label>
              </div>
              <div className="card-actions justify-center">
                <button className="btn mt-2  h-8" onClick={UpdateProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, age, gender, photo }} />
        {ToatShow && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile save successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
