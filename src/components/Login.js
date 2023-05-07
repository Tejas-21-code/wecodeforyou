import "./Login.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  //   signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

function Login({ setUser, user }) {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const loginHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
    setLoginEmail("");
    setLoginPassword("");
  };
  const registerHandler = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registeredEmail,
        registeredPassword
      );
    } catch (error) {
      console.log(error.message);
    }
    setRegisteredEmail("");
    setRegisteredPassword("");
  };

  // console.log(user?.email.split("@"));
  return (
    <>
      <div className="app">
        <div className="box">
          <p>Register</p>
          <input
            value={registeredEmail}
            onChange={(event) => {
              setRegisteredEmail(event.target.value);
            }}
            placeholder="Enter Email"
          />
          <input
            value={registeredPassword}
            onChange={(event) => {
              setRegisteredPassword(event.target.value);
            }}
            placeholder="Enter Password"
          />
          <button onClick={registerHandler}>Register</button>
        </div>
        <div className="box">
          <p>Login</p>
          <input
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            placeholder="Enter Email"
          />
          <input
            value={loginPassword}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            placeholder="Enter Password"
          />
          <button onClick={loginHandler}>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
