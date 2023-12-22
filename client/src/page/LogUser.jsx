import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import customFetch from "../utils/customFetch";

const LogUser = ({ userName }) => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const logoutFromTheApp = async () => {
    await customFetch.get("/auth/logout");
    navigate("/");
  };
  return (
    <div className=" p-2 h-0 ">
      <button
        onClick={() => setLogout(!logout)}
        className="  bg-indigo-500  text-slate-50 ml-auto px-1 flex flex-row items-center rounded-md w-fit "
      >
        <FaUserCircle />
        <span className="mx-1">{userName}</span>
        <FaCaretDown />
      </button>
      <button
        className={` mt-1  bg-indigo-500 text-slate-50 ml-auto px-1 flex flex-row items-center rounded-md w-fit ${
          logout ? "visible" : "hidden"
        }`}
      >
        <AiOutlineLogout />
        <span className="mx-1" onClick={() => logoutFromTheApp()}>
          logout
        </span>
      </button>
    </div>
  );
};

export default LogUser;
