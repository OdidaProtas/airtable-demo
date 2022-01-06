import { Login } from "./features/login/Login";
import { Home } from "./features/home/Home";
import React from "react";

import { useSelector } from "react-redux";
import { AppState } from "./app/reducer";

function App() {
  const classes = useSelector<AppState, AppState["classes"]>(
    (state) => state.classes
  );
  const err = useSelector<AppState, AppState["error"]>((state) => state.error);
  const isLoggedIn = Boolean(classes.length);
  return (
    <>
      {isLoggedIn && <Home />}
      {!isLoggedIn && <Login />}
      {err && <span>An error occured</span>}
    </>
  );
}

export default App;
