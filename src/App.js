import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import LogedIn from "./components/LogedIn";

function App() {
  const [user, setUser] = useState(null);
  // console.log(user);
  // console.log(user?.email.split("@"));

  return (
    <>
      {!user && <Login setUser={setUser} user={user} />}
      {user && <LogedIn user={user} />}
    </>
  );
}

export default App;
