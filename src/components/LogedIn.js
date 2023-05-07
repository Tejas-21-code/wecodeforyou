import React from "react";
import "./LogedIn.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Task from "./Task.js";

const LogedIn = ({ user }) => {
  const logoutHandler = async () => {
    await signOut(auth);
  };

  return (
    <>
      <nav className="btn">
        <p>------User : {user?.email.split("@")[0]}------</p>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
      <Task />
    </>
  );
};

export default LogedIn;
