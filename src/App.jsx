import React, { useState } from "react";
import Login from "./components/Login";
import Success from "./components/Success";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <Success /> : <Login onSuccess={() => setLoggedIn(true)} />}
    </div>
  );
}
